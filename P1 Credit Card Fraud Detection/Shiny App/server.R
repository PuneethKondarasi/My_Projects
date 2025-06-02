library(shiny)
library(dplyr)
library(caret)
library(pROC)
library(rpart)
library(rpart.plot)
library(randomForest)
library(ranger)
library(xgboost)
library(data.table)

dataset <- read.csv("C:/Users/punee/.vscode/Programs/Credit Card Fraud Detection/Data/creditcard.csv")
dataset$Class <- as.factor(dataset$Class)
dataset$Time <- NULL

set.seed(123)
splitIndex <- createDataPartition(dataset$Class, p = 0.8, list = FALSE)
trainData <- dataset[splitIndex, ]
testData <- dataset[-splitIndex, ]

model_store <- reactiveValues(
  model = NULL,
  roc = NULL,
  threshold = NULL,
  metrics = NULL,
  prob = NULL
)

shinyServer(function(input, output, session) {
  
  observeEvent(input$train, {
    features <- names(trainData)[names(trainData) != "Class"]
    
    withProgress(message = 'Training Model', value = 0, {
      if (input$model_type == "Logistic Regression") {
        incProgress(0.2)
        model <- glm(Class ~ ., data = trainData, family = "binomial")
        prob <- predict(model, testData, type = "response")
      } else if (input$model_type == "Decision Tree") {
        incProgress(0.2)
        model <- rpart(Class ~ ., data = trainData, method = "class",
                       weights = ifelse(trainData$Class == "1", 100, 1),
                       control = rpart.control(cp = 0.0001, minsplit = 2, minbucket = 1))
        
        prob <- predict(model, testData, type = "prob")[, 2]
      } else if (input$model_type == "Random Forest") {
        incProgress(0.2)
        model <- ranger(Class ~ ., data = trainData, probability = TRUE,
                        class.weights = c("0" = 1, "1" = 100),
                        num.trees = 200)
        prob <- predict(model, testData)$predictions[, 2]
      } else if (input$model_type == "XGBoost") {
        incProgress(0.2)
        train_matrix <- xgb.DMatrix(data = as.matrix(trainData[, features]), 
                                    label = as.numeric(trainData$Class) - 1)
        model <- xgboost(data = train_matrix, 
                         label = as.numeric(trainData$Class) - 1,
                         objective = "binary:logistic", 
                         nrounds = 100, 
                         verbose = 0,
                         scale_pos_weight = sum(trainData$Class == "0") / sum(trainData$Class == "1"))
        prob <- predict(model, as.matrix(testData[, features]))
      }
      
      incProgress(0.2, detail = "Evaluating Model")
      roc_obj <- roc(testData$Class, prob)
      threshold <- coords(roc_obj, "best", ret = "threshold")$threshold
      pred_class <- ifelse(prob > threshold, 1, 0)
      cm <- confusionMatrix(factor(pred_class), testData$Class, positive = "1")
      
      model_store$model <- model
      model_store$roc <- roc_obj
      model_store$threshold <- threshold
      model_store$metrics <- list(
        AUC = auc(roc_obj),
        Accuracy = cm$overall["Accuracy"],
        Sensitivity = cm$byClass["Sensitivity"],
        Specificity = cm$byClass["Specificity"],
        Precision = cm$byClass["Precision"],
        F1 = cm$byClass["F1"]
      )
      model_store$prob <- prob
    })
  })
  
  output$roc_curve <- renderPlot({
    req(model_store$roc)
    plot(model_store$roc, main = paste("ROC Curve -", input$model_type))
    abline(v = 1 - model_store$threshold, col = "red", lty = 2)
  })
  
  output$threshold_plot <- renderPlot({
    req(model_store$roc)
    plot(1 - model_store$roc$specificities, model_store$roc$sensitivities,
         type = "l", xlab = "False Positive Rate", ylab = "True Positive Rate",
         main = "Threshold Analysis")
    abline(v = 1 - model_store$threshold, col = "red", lty = 2)
  })
  
  output$model_metrics <- renderPrint({
    req(model_store$metrics)
    cat("AUC:", round(model_store$metrics$AUC, 3), "\n")
    cat("Accuracy:", round(model_store$metrics$Accuracy, 3), "\n")
    cat("Sensitivity (Recall):", round(model_store$metrics$Sensitivity, 3), "\n")
    cat("Specificity:", round(model_store$metrics$Specificity, 3), "\n")
    cat("Precision:", round(model_store$metrics$Precision, 3), "\n")
    cat("F1 Score:", round(model_store$metrics$F1, 3), "\n")
  })
  
  output$decision_tree_plot <- renderPlot({
    req(model_store$model)
    if (input$model_type == "Decision Tree") {
      rpart.plot(model_store$model, main = "Decision Tree")
    }
  })
  
  observeEvent(input$predict, {
    req(model_store$model)
    
    # Create new input data for prediction
    new_data <- data.frame(matrix(ncol = 29, nrow = 1))
    colnames(new_data) <- names(trainData)[names(trainData) != "Class"]
    
    for (i in 1:28) {
      new_data[[paste0("V", i)]] <- as.numeric(input[[paste0("v", i)]])
    }
    
    new_data$Amount <- as.numeric(input$amount)
    
    # Ensure same column order as training data
    new_data <- new_data[, names(trainData)[names(trainData) != "Class"]]
    
    prob <- 0
    
    # Prediction based on selected model
    if (input$model_type == "Logistic Regression") {
      prob <- predict(model_store$model, new_data, type = "response")
      
    } else if (input$model_type == "Decision Tree") {
      prob_pred <- predict(model_store$model, new_data, type = "prob")
      
      if ("1" %in% colnames(prob_pred)) {
        prob <- prob_pred[, "1"]
      } else {
        prob <- 0
      }
      
    } else if (input$model_type == "Random Forest") {
      prob <- predict(model_store$model, new_data)$predictions[, 2]
      
    } else if (input$model_type == "XGBoost") {
      prob <- predict(model_store$model, as.matrix(new_data))
    }
    
    pred <- ifelse(prob > model_store$threshold, "Fraud", "Legitimate")
    
    output$prediction_result <- renderText({
      paste("Prediction:", pred, 
            "\nProbability of Fraud:", round(prob, 5),
            "\nThreshold used:", round(model_store$threshold, 3))
    })
  })
  
})
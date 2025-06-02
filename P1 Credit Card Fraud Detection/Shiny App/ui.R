library(shiny)

shinyUI(fluidPage(
  titlePanel("Credit Card Fraud Detection"),
  
  sidebarLayout(
    sidebarPanel(
      h4("Enter Transaction Details"),
      
      lapply(1:28, function(i) numericInput(paste0("v", i), paste0("V", i, ":"), value = c(
        -1.359807, -0.072781, 2.536347, 1.378155, -0.338321, 0.462388, 0.239599, 0.098698,
        0.363787, 0.090794, -0.551600, -0.617801, -0.991390, -0.311169, 1.468177, -0.470401,
        0.207971, 0.025791, 0.403993, 0.251412, -0.018307, 0.277838, -0.110474, 0.066928,
        0.128539, -0.189115, 0.133558, -0.021053
      )[i])),

      numericInput("amount", "Amount", value = 149.62),
      
      selectInput("model_type", "Select Model:",
                  choices = c("Logistic Regression", "Decision Tree", "Random Forest", "XGBoost")),
      
      actionButton("train", "Train Model", class = "btn-primary"),
      br(), br(),
      actionButton("predict", "Predict Transaction", class = "btn-success"),
      br(), br(),
      h4("Prediction:"),
      verbatimTextOutput("prediction_result")
    ),
    
    mainPanel(
      h3("Model Performance"),
      plotOutput("roc_curve"),
      plotOutput("threshold_plot"),
      h4("Performance Metrics:"),
      verbatimTextOutput("model_metrics"),
      conditionalPanel(
        condition = "input.model_type == 'Decision Tree'",
        plotOutput("decision_tree_plot")
      )
    )
  )
))
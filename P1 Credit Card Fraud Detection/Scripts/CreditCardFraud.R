library(dplyr)
library(ranger) #random forest
library(caret)
library(caTools)
library(data.table)
library(ggplot2)
library(ROSE) #Data balancing
library(pROC) #ROC
library(rpart) #decision tree
library(rpart.plot)
library(xgboost)
library(ROCR)

dataset <- setDT(read.csv("C:/Users/punee/.vscode/Programs/Credit Card Fraud Detection/Data/creditcard.csv"))


# Data exploration
head(dataset)
tail(dataset)
table(dataset$Class)
summary(dataset$Amount)
colSums(is.na(dataset))
hist(dataset$Amount)


# Data visualization
dataset %>%
  ggplot(aes(x = Time, fill = factor(Class))) +
  geom_histogram(bins = 100) +
  labs(x = "Time (seconds)", y = "No. of transactions", title = "Transaction Distribution") +
  facet_grid(Class ~ ., scales = 'free_y') + theme()


# Feature Scaling
dataset$Amount <- scale(dataset$Amount)


# Prepare dataset
new_data <- dataset[, -c(1)]
new_data$Class <- as.factor(new_data$Class)
levels(new_data$Class) <- c("Not Fraud", "Fraud")


# Train-test split
set.seed(101)
split <- sample.split(new_data$Class, SplitRatio = 0.8)
train_data <- subset(new_data, split == TRUE)
test_data <- subset(new_data, split == FALSE)


# Show train and test data samples
print("Train Data Sample:")
head(train_data)
table(train_data$Class)

print("Test Data Sample:")
head(test_data)
table(test_data$Class)


# Handle Class Imbalance using ROSE
set.seed(9560)
rose_train_data <- ROSE(Class ~ ., data = train_data)$data

# Plot class distribution before ROSE sampling
ggplot(train_data, aes(x = factor(Class))) +
  geom_bar(fill = "skyblue") +
  ggtitle("Class Distribution Before ROSE Sampling") +
  xlab("Class") +
  ylab("Count") +
  theme_minimal()

# Plot class distribution after ROSE sampling
ggplot(rose_train_data, aes(x = factor(Class))) +
  geom_bar(fill = "lightgreen") +
  ggtitle("Class Distribution After ROSE Sampling") +
  xlab("Class") +
  ylab("Count") +
  theme_minimal()


# ----------------- LOGISTIC REGRESSION -----------------
logistic_model <- glm(Class ~ ., data = rose_train_data, family = 'binomial')
logistic_predictions <- predict(logistic_model, test_data, type = 'response')

# ROC Curve for Logistic Regression
roc.curve(test_data$Class, logistic_predictions, 
          plotit = TRUE, 
          col = "blue", 
          main = "ROC Curve - Logistic Regression")
legend("bottomright", legend = "Logistic Regression", col = "blue", lwd = 2)


# ----------------- DECISION TREE -----------------
decisionTree_model <- rpart(Class ~ ., data = rose_train_data, method = 'class')
rpart.plot(decisionTree_model)

decisionTree_predictions <- predict(decisionTree_model, test_data, type = 'prob')[,2]

# ROC Curve for Decision Tree
roc.curve(test_data$Class, decisionTree_predictions, 
          plotit = TRUE, 
          col = "red",
          main = "ROC Curve - Decision Tree")
legend("bottomright", legend = "Decision Tree", col = "red", lwd = 2)



# ----------------- RANDOM FOREST -----------------
rf_fit <- ranger(Class ~ ., 
                 data = rose_train_data, 
                 num.trees = 200,
                 mtry = 5,
                 min.node.size = 10, 
                 importance = 'impurity', 
                 probability = TRUE)

rf_pred <- predict(rf_fit, test_data)$predictions[,2]

roc.curve(test_data$Class, rf_pred, 
          plotit = TRUE, 
          col = 'green',
          main = "ROC Curve - Random Forest")
legend("bottomright", legend = "Random Forest", col = "green", lwd = 2)



# ----------------- HYPERPARAMETER TUNING FOR XGBOOST -----------------
labels <- rose_train_data$Class
y <- ifelse(labels == "Not Fraud", 0, 1)

set.seed(42)
xgb <- xgboost(
  data = data.matrix(rose_train_data[,-30]), 
  label = y,
  eta = 0.05,
  gamma = 0.1,
  max_depth = 6,
  nrounds = 150,
  objective = "binary:logistic",
  colsample_bytree = 0.7,
  subsample = 0.7,
  verbose = 0,
  nthread = 2
)

xgb_pred <- predict(xgb, data.matrix(test_data[,-30]))

# ROC Curve for XGBoost
roc.curve(test_data$Class, xgb_pred, 
          plotit = TRUE,
          col = "black",
          main = "ROC Curve - XGBoost")
legend("bottomright", legend = "XGBoost", col = "black", lwd = 2)


# ----------------- EVALUATION FOR LOGISTIC REGRESSION -----------------
logistic_pred_class <- ifelse(logistic_predictions > 0.5, "Fraud", "Not Fraud")
logistic_pred_class <- factor(logistic_pred_class, levels = c("Not Fraud", "Fraud"))
logistic_cm <- confusionMatrix(logistic_pred_class, test_data$Class)
logistic_precision <- logistic_cm$byClass['Precision']
logistic_recall <- logistic_cm$byClass['Recall']
logistic_auc <- roc(test_data$Class, logistic_predictions)$auc

# ----------------- EVALUATION FOR DECISION TREE -----------------
decisionTree_pred_class <- ifelse(decisionTree_predictions > 0.5, "Fraud", "Not Fraud")
decisionTree_pred_class <- factor(decisionTree_pred_class, levels = c("Not Fraud", "Fraud"))
decisionTree_cm <- confusionMatrix(decisionTree_pred_class, test_data$Class)
decisionTree_precision <- decisionTree_cm$byClass['Precision']
decisionTree_recall <- decisionTree_cm$byClass['Recall']
decisionTree_auc <- roc(test_data$Class, decisionTree_predictions)$auc

# ----------------- EVALUATION FOR RANDOM FOREST -----------------
rf_pred_class <- ifelse(rf_pred > 0.5, "Fraud", "Not Fraud")
rf_pred_class <- factor(rf_pred_class, levels = c("Not Fraud", "Fraud"))
rf_cm <- confusionMatrix(rf_pred_class, test_data$Class)
rf_precision <- rf_cm$byClass['Precision']
rf_recall <- rf_cm$byClass['Recall']
rf_auc <- roc(test_data$Class, rf_pred)$auc

# ----------------- EVALUATION FOR XGBOOST -----------------
xgb_pred_class <- ifelse(xgb_pred > 0.5, "Fraud", "Not Fraud")
xgb_pred_class <- factor(xgb_pred_class, levels = c("Not Fraud", "Fraud"))
xgb_cm <- confusionMatrix(xgb_pred_class, test_data$Class)
xgb_precision <- xgb_cm$byClass['Precision']
xgb_recall <- xgb_cm$byClass['Recall']
xgb_auc <- roc(test_data$Class, xgb_pred)$auc


# ----------------- COMPARATIVE DATAFRAME -----------------
model_comparison <- data.frame(
  Model = c("Logistic Regression", "Decision Tree", "Random Forest", "XGBoost"),
  Precision = c(logistic_precision, decisionTree_precision, rf_precision, xgb_precision),
  Recall = c(logistic_recall, decisionTree_recall, rf_recall, xgb_recall),
  AUC = c(logistic_auc, decisionTree_auc, rf_auc, xgb_auc)
)

# Reshape the dataframe for ggplot
model_comparison_long <- reshape2::melt(model_comparison, id.vars = "Model", variable.name = "Metric", value.name = "Value")


# ----------------- PLOTTING COMPARATIVE BAR CHART -----------------
ggplot(model_comparison_long, aes(x = Model, y = Value, fill = Metric)) +
  geom_bar(stat = "identity", position = "dodge") +
  labs(title = "Comparative Performance: Precision, Recall, AUC-ROC", 
       x = "Model", 
       y = "Score") +
  scale_fill_manual(values = c("skyblue", "lightgreen", "salmon")) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))


# ----------------- THRESHOLD OPTIMIZATION -----------------
test_data$Class <- ifelse(test_data$Class == "Fraud", 1, 0)
pred_obj <- prediction(xgb_pred, test_data$Class)
perf <- performance(pred_obj, "tpr", "fpr")

# Find the best threshold (Closest to perfect TPR/FPR balance)
best_threshold_index <- which.max(perf@y.values[[1]] - perf@x.values[[1]])
best_threshold <- perf@alpha.values[[1]][best_threshold_index]

optimized_predictions <- ifelse(xgb_pred > best_threshold, "Fraud", "Not Fraud")
optimized_predictions <- factor(optimized_predictions, levels = c("Not Fraud", "Fraud"))

print(paste("Optimized Threshold:", best_threshold))

# Evaluate Model
test_data$Class <- factor(test_data$Class, levels = c(0, 1), labels = c("Not Fraud", "Fraud"))
conf_matrix <- confusionMatrix(optimized_predictions, test_data$Class)
print(conf_matrix)

true_labels <- ifelse(test_data$Class == "Fraud", 1, 0)
pred_obj <- prediction(xgb_pred, true_labels)
perf <- performance(pred_obj, "tpr", "fpr")
thresholds <- perf@alpha.values[[1]]
tpr <- perf@y.values[[1]]
fpr <- perf@x.values[[1]]

plot(thresholds, tpr, type = "l", col = "blue", ylim = c(0, 1),
     xlab = "Threshold", ylab = "Rate", main = "TPR and FPR vs. Threshold")
lines(thresholds, fpr, col = "red")
legend("bottomleft", legend = c("TPR", "FPR"), col = c("blue", "red"), lty = 1)

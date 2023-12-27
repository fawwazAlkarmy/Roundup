import React from "react";
import { Controller } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";

interface Props {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  control: any;
}

const QuestionItem = ({ question, control }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.questionNumberContainer}>
        <View style={styles.numberContainer}>
          <Text style={[mainStyles.boldFont, styles.numberText]}>
            {question.id}
          </Text>
        </View>
        <Text style={[mainStyles.boldFont, styles.questionText]}>
          {question.question}
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <Controller
            key={option}
            control={control}
            name={String(question.id)}
            render={({ field }) => (
              <Pressable
                onPress={() => field.onChange(option)}
                style={[field.value === option ? styles.activeOption : null]}
              >
                <Text style={mainStyles.normalFont}>{option}</Text>
              </Pressable>
            )}
          />
        ))}
      </View>
    </View>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  numberContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    width: 25,
    height: 25,
  },
  numberText: {
    color: Colors.white,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 25,
  },
  questionNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  questionText: {
    width: 265,
  },
  optionsContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
  },
  activeOption: {
    borderBottomWidth: 2,
  },
});

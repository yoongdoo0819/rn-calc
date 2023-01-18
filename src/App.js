import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import CustomButton, { ButtonTypes } from './components/Button';

const Operators = {
  CLEAR: 'C',
  MINUS: '-',
  PLUS: '+',
  EQUAL: '=',
};

export default function App() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);
  console.log(formula);

  const width = (useWindowDimensions().width - 5) / 4;

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });

    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressNumber = (num) => {
    const last = formula[formula.length - 1];
    if (isNaN(last)) {
      setResult(num);
      setFormula((prev) => [...prev, num]);
    } else {
      const newNumber = (last ?? 0) * 10 + num;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setResult(0);
        setFormula([]);
        break;
      case Operators.EQUAL:
        calculate();
        break;
      default:
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* 결과 */}
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{result}</Text>
        </View>

        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          <View style={styles.leftPad}>
            <View style={styles.number}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                return (
                  <CustomButton
                    key={num}
                    title={num}
                    onPress={() => onPressNumber(num)}
                    buttonStyle={{ width, height: width, marginTop: 1 }}
                  ></CustomButton>
                );
              })}
            </View>
            <View style={styles.bottom}>
              <CustomButton
                title="0"
                onPress={() => onPressNumber(0)}
                buttonStyle={{ width: width * 2, height: width }}
              ></CustomButton>
              <CustomButton
                title={Operators.EQUAL}
                onPress={() => onPressOperator(Operators.EQUAL)}
                buttonStyle={{ width, height: width, marginBottom: 1 }}
                buttonType={ButtonTypes.OPERATOR}
              />
            </View>
          </View>
          <View style={styles.operator}>
            <CustomButton
              title={Operators.CLEAR}
              onPress={() => onPressOperator(Operators.CLEAR)}
              buttonStyle={{ width, height: width, marginBottom: 1 }}
              buttonType={ButtonTypes.OPERATOR}
            />
            <CustomButton
              title={Operators.MINUS}
              onPress={() => onPressOperator(Operators.MINUS)}
              buttonStyle={{ width, height: width, marginBottom: 1 }}
              buttonType={ButtonTypes.OPERATOR}
            />
            <CustomButton
              title={Operators.PLUS}
              onPress={() => onPressOperator(Operators.PLUS)}
              buttonStyle={{ width, height: width * 2, marginBottom: 1 }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>

        <StatusBar Style={'light'} backgroundColor={'white'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    color: 'green',
  },
  resultContainer: {
    flex: 1,
    // width: 100,
    // height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#000000',
  },
  buttonContainer: {
    //flex: 1,
    // width: 100,
    // height: 100,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-evenly',
  },
  result: {
    color: '#ffffff',
    fontSize: 60,
    fontWeight: '700',
    paddingBottom: 30,
    paddingRight: 30,
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  operator: {},
});

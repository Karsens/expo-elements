/**
 * Better examples I could use: https://github.com/JesperLekland/react-native-svg-charts-examples
 *
 * #later
 * - [x] decide how a slice of data should look
 * - [ ] #totest get real data...
 * - [ ] try it with real data
 * - [ ] remove fake data, and see how it looks
 * - [ ] somehow add labels, other library? Or add them myself in a wrapper?
 * - [ ] add some cool animation onPress would be insanely cool.
 */

import React from "react";

import { PieChart } from "react-native-svg-charts";

export type PieSlice = {
  value: number,
  label: string,
  color: string,
  onPress?: () => void,
};

type P = {
  data?: PieSlice[],
};

/**
pure.graph.pie
*/
class PieChartComponent extends React.PureComponent<P> {

  render() {
    // const { data } = this.props;

    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ];

    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log("press", index),
        },
        key: `pie-${index}`,
      }));

    return <PieChart style={{ height: 200 }} data={pieData} />;
  }

}

export default PieChartComponent;

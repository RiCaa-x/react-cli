import type { ECOption } from "@/plugins/echarts";
import echarts from "@/plugins/echarts";
import { memo, useCallback, useEffect, useRef } from "react";
import { useResizeDetector } from "react-resize-detector"; // vue中对应的插件是 element-resize-detector

interface IOption {
  options: ECOption;
}

const MyEcharts = memo(({ options }: IOption) => {
  const domRef: any = useRef();

  // 使用useRef保留更新前(上一次)的echarts实例。
  const chartGetter: any = useRef(null);

  // 创建或销毁Echarts实例：
  useEffect(() => {
    const myChart: any = echarts.init(domRef.current);
    chartGetter.current = myChart; // 记录echarts实例
    return () => {
      myChart.dispose();
    };
  }, []);

  // 监听父组件传入options的变化，以更新图表：
  useEffect(() => {
    chartGetter.current.setOption(options, true);
  }, [options]);

  useDivResize(domRef, chartGetter); // 它是一个hook，所以不能在useEffect中调用

  return <div ref={domRef} style={{ width: "100%", height: "100%" }} />;
});

// 监听图表所在div变化的函数：
function useDivResize(targetRef: any, chartGetter: any) {
  const onResize = useCallback(() => {
    const echartInstance: any = chartGetter.current;
    if (echartInstance) echartInstance.resize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useResizeDetector({
    targetRef,
    onResize

    // 打开下面两行就是防抖
    // refreshMode: 'debounce',
    // refreshRate: 100,
  });
}

export default MyEcharts;

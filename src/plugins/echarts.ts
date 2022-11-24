import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts';
import { BarChart, LineChart, PictorialBarChart, PieChart } from 'echarts/charts';

// 组件类型的定义后缀都为 ComponentOption
import type {
  DatasetComponentOption,
  DataZoomComponentOption,
  GraphicComponentOption,
  GridComponentOption,
  LegendComponentOption,
  MarkLineComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption
} from 'echarts/components';
import {
  // 数据集组件
  DatasetComponent,
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | DataZoomComponentOption
  | MarkLineComponentOption
  | DatasetComponentOption
  | GraphicComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  LegendComponent,
  MarkLineComponent,
  DataZoomComponent,
  DatasetComponent,
  TransformComponent,
  GraphicComponent,
  BarChart,
  LineChart,
  PieChart,
  PictorialBarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default echarts;

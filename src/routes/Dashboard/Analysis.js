import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tooltip } from 'antd';
import {
  ChartCard, Pie,
} from '../../components/Charts';

import styles from './Analysis.less';

@connect(state => ({
  chart: state.chart,
}))
export default class Analysis extends Component {
  state = {
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }
  render() {
    const { chart } = this.props;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    if (chart.data !== null) {
      return (
        <div>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="数据中心数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.centerCounts}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="应用数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.appCounts}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="应用实例数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.instantCounts}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="接入设备数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.equipmentCounts}
                contentHeight={46}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <Card
                title="CPU利用率"
                style={{ marginBottom: 24 }}
                bordered={false}
                className={styles.pieCard}
              >
                <Row gutter={4} style={{ padding: '16px 0' }}>
                  <Col span={22}>
                    <Pie
                      animate={false}
                      percent={chart.data === null ? 1 : chart.data.cpu}
                      total={chart.data === null ? '1%' : `${chart.data.cpu}%`}
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card
                title="内存使用率"
                style={{ marginBottom: 24 }}
                bordered={false}
                className={styles.pieCard}
              >
                <Row gutter={4} style={{ padding: '16px 0' }}>
                  <Col span={22}>
                    <Pie
                      animate={false}
                      percent={chart.data === null ? 1 : chart.data.mer}
                      total={chart.data === null ? '1%' : `${chart.data.mer}%`}
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card
                title="存储使用率"
                style={{ marginBottom: 24 }}
                bordered={false}
                className={styles.pieCard}
              >
                <Row gutter={4} style={{ padding: '16px 0' }}>
                  <Col span={22}>
                    <Pie
                      animate={false}
                      percent={chart.data === null ? 1 : chart.data.storage}
                      total={chart.data === null ? '1%' : `${chart.data.storage}%`}
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="数据中心数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.centerCounts}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="应用数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.appCounts}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="应用实例数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.instantCounts}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="接入设备数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={chart.data === null ? 1 : chart.data.equipmentCounts}
                contentHeight={46}
              />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

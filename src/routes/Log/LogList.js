import React, { PureComponent } from 'react';
import Iframe from 'react-iframe';
import { connect } from 'dva';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './LogList.less';

const { Option } = Select;
const FormItem = Form.Item;

@connect(state => ({
  logList: state.logList,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    expandForm: false,
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'logList/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      dispatch({
        type: 'logList/fetch',
        payload: values,
      });
    });
  }


  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="实例名">
              {getFieldDecorator('instantName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    return (
      <PageHeaderLayout title="CacheCloud">
        <div className={styles.tableList}>
          <Iframe
            url="http://10.0.0.95:5601/app/kibana"
            width="100%"
            height="800px"
            id="myId"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      </PageHeaderLayout>
    );
  }
}

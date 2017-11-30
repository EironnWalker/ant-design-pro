import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, InputNumber, DatePicker, Badge, Modal } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './EquipmentDetailList.less';

const { Option } = Select;
const FormItem = Form.Item;
const statusMap = ['success', 'error'];

@connect(state => ({
  equipmentDetailList: state.equipmentDetailList,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    modalVisible: false,
    inputValue: '正在开发中...',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'equipmentDetailList/fetch',
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'equipmentDetailList/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleRefresh = () => {
    this.setState({
      modalVisible: true,
    });
  }

  handleAdd = () => {
    this.setState({
      modalVisible: false,
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
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
        type: 'equipmentDetailList/fetch',
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
            <FormItem label="服务器ID">
              {getFieldDecorator('serverId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">1000</Option>
                  <Option value="1">1001</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="应用名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
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
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { equipmentDetailList: { loading, data } } = this.props;
    const { selectedRows, modalVisible, inputValue } = this.state;
    const onlineStatus = ['在线', '离线'];
    const columns = [
      {
        title: '服务器ID',
        dataIndex: 'serverId',
      },
      {
        title: '设备ID',
        dataIndex: 'equipmentId',
      },
      {
        title: '设备编号',
        dataIndex: 'equipmentNo',
      },
      {
        title: '设备名称',
        dataIndex: 'equipmentName',
      },
      {
        title: '是否在线',
        dataIndex: 'online',
        filters: [
          {
            text: onlineStatus[0],
            value: true,
          },
          {
            text: onlineStatus[1],
            value: false,
          },
        ],
        render(val) {
          return (
            <Badge
              status={statusMap[val === true ? 0 : 1]}
              text={onlineStatus[val === true ? 0 : 1]}
            />
          );
        },
      },
      {
        title: '设备类型',
        dataIndex: 'equipmentType',
      },
      {
        title: '设备用途',
        dataIndex: 'equipmentPurpose',
      },
      {
        title: '设备IP',
        dataIndex: 'equipmentIp',
      },
      {
        title: '设备端口',
        dataIndex: 'equipmentPort',
      },
      {
        title: '设备MAC',
        dataIndex: 'mac',
      },
      {
        title: '子网掩码',
        dataIndex: 'mask',
      },
      {
        title: '网关',
        dataIndex: 'gateway',
      },
    ];

    return (
      <PageHeaderLayout
        title="查询表格"
      >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="sync" type="primary" onClick={() => this.handleRefresh()}>刷新</Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
        <Modal
          title="新建规则"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
          >
            <p>{inputValue}</p>
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}

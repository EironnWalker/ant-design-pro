import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, InputNumber, DatePicker, Modal, Badge } from 'antd';
import moment from 'moment';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './AuthApp.less';

const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const FormItem = Form.Item;
const operationTabList = [{
  key: 'tab1',
  tab: '开放需求',
}, {
  key: 'tab2',
  tab: '需求权限',
}];

@connect(state => ({
  authApp: state.authApp,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    operationKey: 'tab1',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'authApp/fetch',
    });
  }

  onOperationTabChange = (key) => {
    const { dispatch } = this.props;
    switch (key) {
      case 'tab1':
        dispatch({
          type: 'authApp/fetchTab1',
          payload: {
            id: key,
          },
          callback: () => {
            this.setState({ operationKey: key });
          },
        });
        break;
      case 'tab2':
        dispatch({
          type: 'authApp/fetchTab2',
          payload: {
            id: key,
          },
          callback: () => {
            this.setState({ operationKey: key });
          },
        });
        break;
      default:
        break;
    }
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'authApp/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'authApp/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleShowModal = (flag, key) => {
    const { dispatch } = this.props;
    switch (this.state.operationKey) {
      case 'tab1':
        dispatch({
          type: 'authApp/fetchTab1',
          payload: {
            id: key,
          },
          callback: () => {
            this.setState({
              modalVisible: true,
            });
          },
        });
        break;
      case 'tab2':
        dispatch({
          type: 'authApp/fetchTab2',
          payload: {
            id: key,
          },
          callback: () => {
            this.setState({
              modalVisible: true,
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
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
        type: 'authApp/fetch',
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
            <FormItem label="应用名">
              {getFieldDecorator('name')(
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
    const { authApp: { loading, tab1Loading, tab2Loading, data, tab1Data, tab2Data } } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const status = ['关闭', '运行中', '已上线', '异常'];
    const tab1Columns = [
      {
        title: '应用名',
        dataIndex: 'name',
      },
      {
        title: '应用版本',
        dataIndex: 'version',
      },
      {
        title: '激活时间',
        dataIndex: 'activeTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '有效期',
        dataIndex: 'validTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '说明',
        dataIndex: 'desc',
      },
    ];
    const tab2Columns = [
      {
        title: '需求应用',
        dataIndex: 'name',
      },
      {
        title: '需求版本',
        dataIndex: 'version',
      },
      {
        title: '说明',
        dataIndex: 'desc',
      },
    ];
    const columns = [
      {
        title: '应用名',
        dataIndex: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '激活时间',
        dataIndex: 'activeTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '有效期',
        dataIndex: 'validTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <div>
            <a onClick={() => this.handleShowModal()}>详情</a>
          </div>
        ),
      },
    ];

    const contentList = {
      tab1: (
        <div className={styles.tableList}>
          <StandardTable
            loading={tab1Loading}
            data={tab1Data}
            columns={tab1Columns}
            selectedRows={selectedRows}
          />
        </div>
      ),
      tab2: (
        <div className={styles.tableList}>
          <StandardTable
            loading={tab2Loading}
            data={tab2Data}
            columns={tab2Columns}
            selectedRows={selectedRows}
          />
        </div>
      ),
    };

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
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
          title="应用详情"
          visible={modalVisible}
          onCancel={() => this.handleModalVisible()}
          width="50%"
          footer={null}
        >
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            onTabChange={this.onOperationTabChange}
          >
            {contentList[this.state.operationKey]}
          </Card>
        </Modal>
      </PageHeaderLayout>
    );
  }
}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, Badge, Divider, notification } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './DatabaseList.less';

const { Option } = Select;
const statusMap = ['default', 'processing', 'success', 'error'];
const FormItem = Form.Item;

@connect(state => ({
  database: state.database,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    visible: false,
    operation: '',
    key: '',
    operationName: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'database/fetch',
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'database/fetch',
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

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      dispatch({
        type: 'database/fetch',
        payload: values,
      });
    });
  }

  handleShowModal = (operation, keyParam, instantName) => {
    this.setState({
      operation: operation === 1 ? '启动' : '停止',
      visible: true,
      key: keyParam,
      operationName: instantName,
    });
  }
  handleOk = () => {
    const { dispatch } = this.props;
    this.setState({
      visible: false,
    });
    dispatch({
      type: 'database/changeDbStatus',
      payload: {
        id: this.state.key,
        type: this.state.operation,
      },
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  handleOperationDone = (operationData) => {
    const { dispatch } = this.props;
    if (operationData.result === '1') {
      dispatch({
        type: 'database/fetch',
      });
    } else {
      notification.error({
        message: '操作发生错误',
        description: operationData.msg,
      });
    }
    dispatch({
      type: 'database/resetOperation',
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
    const { database: { loading, data, operationDone, operationData } } = this.props;
    const { selectedRows } = this.state;
    const status = ['关闭', '运行中', '已上线', '异常'];
    const columns = [
      {
        title: '实例名',
        dataIndex: 'instantName',
      },
      {
        title: '数据库类型',
        dataIndex: 'dbType',
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
        title: '说明',
        dataIndex: 'dbDesc',
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a onClick={() => this.handleShowModal(1, record.id, record.instantName)}>启动</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleShowModal(0, record.id, record.instantName)}>停止</a>
          </div>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="查询表格">
        {
          operationDone &&
          this.handleOperationDone(operationData)
        }
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
          title="确认操作"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>你确定要对【{this.state.operationName}】执行【{this.state.operation}】操作吗？</p>
        </Modal>
      </PageHeaderLayout>
    );
  }
}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, notification } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './MqList.less';

const { Option } = Select;
const FormItem = Form.Item;

@connect(state => ({
  mq: state.mq,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    visible: false,
    createVisible: false,
    key: '',
    operationName: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mq/fetch',
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'mq/fetch',
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

  handleCreateVisible = () => {
    this.setState({
      createVisible: true,
    });
  }
  handleCreateOk = () => {
    this.setState({
      createVisible: false,
    });
  }
  handleCreateCancel = () => {
    this.setState({
      createVisible: false,
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
        type: 'mq/fetch',
        payload: values,
      });
    });
  }

  handleDeleteModal = (keyParam, instantName) => {
    this.setState({
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
      type: 'mq/deleteMq',
      payload: {
        id: this.state.key,
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
        type: 'mq/fetch',
      });
    } else {
      notification.error({
        message: '操作发生错误',
        description: operationData.msg,
      });
    }
    dispatch({
      type: 'mq/resetOperation',
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
    const { mq: { loading, data, operationDone, operationData } } = this.props;
    const { selectedRows } = this.state;
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '用户',
        dataIndex: 'users',
      },
      {
        title: '就绪消息数',
        dataIndex: 'readyMsgs',
      },
      {
        title: '未确认消息数',
        dataIndex: 'unackedMsgs',
      },
      {
        title: '总消息数',
        dataIndex: 'totalMsgs',
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a onClick={() => this.handleDeleteModal(record.id, record.name)}>删除</a>
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
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateVisible(true)}>新建</Button>
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
          <p>你确定要对【{this.state.operationName}】执行【删除】操作吗？</p>
        </Modal>
        <Modal
          title="新建操作"
          visible={this.state.createVisible}
          onOk={this.handleCreateOk}
          onCancel={this.handleCreateCancel}
        >
          <p>新建操作...</p>
        </Modal>
      </PageHeaderLayout>
    );
  }
}

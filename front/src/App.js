import logo from './logo.svg';
import logo2 from './logo-white.svg';
import { Component } from 'react';
import './App.css';
import './scss/bootstrap-new.css';
import 'antd/dist/antd.css';
import { Table, Divider, Tag, Input, Select, Pagination, Layout, Row, Col, Tabs, Button, Space, Modal, Form , InputNumber, message } from 'antd';
import ApiService from "../src/services/api.services";
import Header from "../src/components/header";
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      divisions: [],
      filterTable: null,
      filter_col_division: [],
      filter_col_superior_division: [],
      filter_col_level: [],
      filter_column: "",
      options_superior_division: [],
      options_ambassador: [],
      isModalVisible: false,
      name_divion: "",
      collaborators: 0,
      level: 0,
      id_parent: 0,
      id_ambassador: 0,
      total_collaborators: 0,
    };
  }

  componentWillMount() {
    this.getDataDivisions();
  }

  getDataDivisions(){

    ApiService.getDivisions().then(
      (res) => {
        if(res && res.status == 'success'){

          let array_items = new Array;
          let array_filter_divisions = new Array;
          let array_filter_superior_divisions = new Array;
          let array_filter_levels = new Array;
          let array_options_superior_division = new Array;
          let array_options_ambassador = new Array;
          let total_collaborators = 0;
          for (var i = 0; i < res.data.length; i++) {
            let item = {
              key: res.data[i].id,
              division: res.data[i].name,
              superior_division: res.data[i].superior_division?res.data[i].superior_division:'-',
              collaborators: res.data[i].collaborators,
              level: res.data[i].level.toString(),
              subdivisions: res.data[i].subdivisions,
              ambassador_name: res.data[i].ambassador_name?res.data[i].ambassador_name:'-',
            }
            array_items.push(item)

            total_collaborators = total_collaborators + res.data[i].collaborators;

            if(res.data[i].name != '' && !array_filter_divisions.some(el => el.value === res.data[i].name)){
              let item = {
                text: res.data[i].name,
                value: res.data[i].name,
              }
              array_filter_divisions.push(item)
            }
            if(res.data[i].superior_division != '' && !array_filter_superior_divisions.some(el => el.value === res.data[i].superior_division)){
              let item = {
                text: res.data[i].superior_division,
                value: res.data[i].superior_division,
              }
              array_filter_superior_divisions.push(item)
            }
            if(!array_filter_levels.some(el => el.value === res.data[i].level.toString())){
              let item = {
                text: res.data[i].level.toString(),
                value: res.data[i].level.toString(),
              }
              array_filter_levels.push(item)
            }

            if(res.data[i].superior_division != '' && !array_options_superior_division.some(el => el.value === res.data[i].id_parent)){
              let item = {
                label: res.data[i].superior_division,
                value: res.data[i].id_parent,
              }
              array_options_superior_division.push(item)
            }

            if(res.data[i].superior_division != '' && !array_options_superior_division.some(el => el.value === res.data[i].id_parent)){
              let item = {
                label: res.data[i].superior_division,
                value: res.data[i].id_parent,
              }
              array_options_superior_division.push(item)
            }

            if(res.data[i].ambassador_name != '' && !array_options_ambassador.some(el => el.value === res.data[i].id_ambassador)){
              let item = {
                label: res.data[i].ambassador_name,
                value: res.data[i].id_ambassador,
              }
              array_options_ambassador.push(item)
            }
          }
          
          this.setState({
            divisions: array_items,
            filter_col_division: array_filter_divisions,
            filter_col_superior_division: array_filter_superior_divisions,
            filter_col_level: array_filter_levels,
            options_superior_division: array_options_superior_division,
            options_ambassador: array_options_ambassador,
            total_collaborators: total_collaborators,
          });

        }
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }

  handleChange = value => {
    //console.log(`Selected: ${value}`);
    this.setState({filter_column: value})
  }

  onChangeName = e => {
    //console.log(`Selected: ${value}`);
    this.setState({name_divion: e.target.value})
  }

  onChangeCollaborator = value => {
    //console.log(`Selected: ${value}`);
    this.setState({collaborators: value})
  }

  onChangeLevel = value => {
    //console.log(`Selected: ${value}`);
    this.setState({level: value})
  }

  onDivisionChange = value => {
    this.setState({id_parent: value})
  }

  onAmbassadorChange = value => {
    this.setState({id_ambassador: value})
  }

  onRegister = () => {

    let data_new_division = {}
    data_new_division = {
      "name": this.state.name_divion,
      'collaborators': this.state.collaborators,
      'level':this.state.level,
      "id_parent": this.state.id_parent,
      "id_ambassador": this.state.id_ambassador
    }

    this.setState({isModalVisible: false});

    ApiService.postDivision(data_new_division).then(
      (res) => {
          if(res){
              if(res && res.status == 'success'){
                  message.success('Division registrado!', 10);
                  this.getDataDivisions();
              }else{
                message.error(res.message, 10);
              }
          }
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );

  }

  searchDivision = value => {
    console.log(this.state.filter_column)
    if(this.state.filter_column == "" || !this.state.filter_column){
      this.setState({ filterTable: null });
      return false;
    }else{
      const filterTable = this.state.divisions.filter(o =>
        String(o[this.state.filter_column])
        .toLowerCase()
        .includes(value.toLowerCase())
      );
  
      this.setState({ filterTable });
    }
  };

  onChangeSearchDivision = e => {
    if(this.state.filter_column == "" || !this.state.filter_column){
      this.setState({ filterTable: null });
      return false;
    }else{
      const filterTable = this.state.divisions.filter(o =>
        String(o[this.state.filter_column])
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
      );
  
      this.setState({ filterTable });
    }
  };

  showModal = () => {
    this.setState({isModalVisible: true})
  };

  closeModal = () => {
    this.setState({isModalVisible: false})
  };

  render(){

    const { Option } = Select;
    const { Content } = Layout;
    const { TabPane } = Tabs;

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const tailLayout = {
      wrapperCol: { offset: 6, span: 16 },
    };
    
    const columns = [
      {
        title: 'División',
        dataIndex: 'division',
        key: 'division',
        filterSearch: true,
        filters: this.state.filter_col_division
        ,
        onFilter: (value, record) => record.division.indexOf(value) === 0,
        sorter: (a, b) => a.division.length - b.division.length,
      },
      {
        title: 'División superior',
        dataIndex: 'superior_division',
        key: 'superior_division',
        filterSearch: true,
        filters: this.state.filter_col_superior_division
        ,
        onFilter: (value, record) => record.superior_division.indexOf(value) === 0,
        sorter: (a, b) => a.superior_division.length - b.superior_division.length,
      },
      {
        title: 'Colaboradores',
        dataIndex: 'collaborators',
        key: 'collaborators',
        sorter: (a, b) => a.collaborators - b.collaborators,
      },
      {
        title: 'Nivel',
        dataIndex: 'level',
        key: 'level',
        filterSearch: true,
        filters: this.state.filter_col_level
        ,
        onFilter: (value, record) => record.level.indexOf(value) === 0,
        sorter: (a, b) => a.level - b.level,
      },
      {
        title: 'Subdivisiones',
        dataIndex: 'subdivisions',
        key: 'subdivisions',
        sorter: (a, b) => a.subdivisions - b.subdivisions,
      },
      {
        title: 'Embajadores',
        dataIndex: 'ambassador_name',
        key: 'ambassador_name',
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    
    return (
      <div className="App">
        <Header/>
        <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          <div className='container'>
          <Row>
            <Col md={12} style={{textAlign: 'initial'}}>
            <h5>
              Organización
            </h5>
            </Col>
            <Col md={12} >
            <Space size={12} style={{float: 'right'}}>
            <Button type="primary" icon={<PlusOutlined />} onClick={this.showModal}/>
            <Button style={{color: '#40a9ff'}} icon={<UploadOutlined />} />
            <Button style={{color: '#40a9ff'}} icon={<DownloadOutlined />} />
            </Space>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Divisiones" key="1">
            <Row>
              <Col span={8}></Col>
              <Col offset={6}>
                <Select
                  showSearch
                  style={{ width: 200, marginRight: 20 }}
                  placeholder="Columnas"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={this.handleChange}
                  allowClear
                >
                  <Option value="division">División</Option>
                  <Option value="superior_division">División superior</Option>
                  <Option value="collaborators">Colaboradores</Option>
                  <Option value="level">Nivel</Option>
                  <Option value="subdivisions">Subdivisiones</Option>
                  <Option value="ambassador_name">Embajadores</Option>
                </Select>
                <Input.Search
                  style={{ maxWidth: "50%",margin: "0 0 10px 0" }}
                  placeholder="Buscar"
                  enterButton
                  onChange={this.onChangeSearchDivision}
                  onSearch={this.searchDivision}
                />
              </Col>
            </Row>
            <Row>
              <div className='col-md-12'>
                <Table 
                  rowSelection={rowSelection} 
                  dataSource={this.state.filterTable?this.state.filterTable:this.state.divisions} 
                  columns={columns} 
                  //pagination={{ pageSize: 10, showSizeChanger: true }}
                  pagination = {{
                  defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'],
                  showTotal: total => `Total colaboradores ${this.state.total_collaborators}`
                  }}
                />
              </div>
            </Row>
            </TabPane>
            <TabPane tab="Colaboradores" disabled key="2">
            </TabPane>
          </Tabs>
          </div>
          <Modal title="Registrar división" visible={this.state.isModalVisible} onCancel={this.closeModal} footer={null}>
          <Form {...layout} name="control-hooks" onFinish={this.onRegister}>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
              <Input onChange={this.onChangeName}/>
            </Form.Item>
            <Form.Item name="colaboradores" label="Colaboradores" rules={[{ required: true }]}>
              <InputNumber min={1} onChange={this.onChangeCollaborator} />
            </Form.Item>
            <Form.Item name="nivel" label="Nivel" rules={[{ required: true }]}>
              <InputNumber min={1} onChange={this.onChangeLevel} />
            </Form.Item>
            <Form.Item name="division" label="División superior" rules={[{ required: false }]}>
              <Select
                placeholder="Seleccione una división superior"
                onChange={this.onDivisionChange}
                options={this.state.options_superior_division}
                allowClear
              >
              </Select>
            </Form.Item>
            <Form.Item name="ambassador" label="Embajador" rules={[{ required: false }]}>
              <Select
                placeholder="Seleccione un embajador"
                onChange={this.onAmbassadorChange}
                options={this.state.options_ambassador}
                allowClear
              >
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </Form.Item>
          </Form>
          </Modal>
          </Content>
      </div>
    );
  }
}

export default App;

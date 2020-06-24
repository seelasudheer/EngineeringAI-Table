import React, { Component } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'
import './style.css'
import {Link} from 'react-router-dom'
import Pagination from'react-js-pagination'
class TableData extends Component{
    constructor(props){
        super(props)
        this.state={
          tableData:[],
          count:0,
          Total:'',
          pageRange:2
        }
        this.callApi(this.state.count)
    }
    componentDidMount(){
        setInterval(()=>{
         
        this.setState(prevState=>({
            count:prevState.count+1

        }))
        this.callApi(this.state.count)
        },10000)
    }
     callApi(count){
        console.log("Asdasd");
         
          axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
         .then(async res=>{
             console.log(res);
             var records={data:[]}
             
             for(var i=0;i<res.data.hits.length;i++){
                if(i==res.data.hits.length-1){
                    records.data.push(...this.state.tableData,res.data.hits[i])
                }else{
                    records.data.push(res.data.hits[i])
                }
             }
              
              console.log(records,"records1");
              
            await this.setState({   
                tableData:records.data,
                Total:records.data.length
             }) 
             console.log(this.state.Total,"tableData");
             
         })
         .catch(err=>{
             console.log(err);
         })
    }
    handleChange=(e)=>{
      console.log(e);
      
    }
    handlePass=(e,data)=>{
        e.preventDefault()
        console.log(data,"data");
        this.props.history.push('/jsonData',data)
    }
    render(){
        const {tableData} =this.state
        return(
            <React.Fragment>
               <h1> This Table Data</h1> 

               <Table striped bordered responsive>
                   <thead>
                       <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>created_at</th>
                        <th>Author</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           tableData.length>0? tableData.map(x=>{
                               return <tr key={x.id} onClick={(e)=>this.handlePass(e,x)}>
                               <td>{x.title}</td>
                               <td>{x.url}</td>
                               <td>{x.created_at}</td>
                               <td>{x.author}</td>
                              </tr>
                           }):<></>
                       }
                   </tbody>
               </Table>
               <Pagination
               activePage={this.state.count+1}
               itemsCountPerPage={this.state.Total}
               totalItemsCount={this.state.Total}
               pageRange={this.state.pageRange}
               onChange={this.handleChange}
               />
            </React.Fragment>
        )
    }
}
export default TableData
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { storeData } from '../redux/action'
import Pagination from './Pagination';


function Todo() {

    /*==================================================
                  Implementing Pagination 
     ===================================================*/

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    const lastItemIndex = currentPage * postPerPage;
    const firstItemIndex = lastItemIndex - postPerPage;




    const handlePage = (value) => {
        setCurrentPage(currentPage + value);
    }




    




    /*==================================================
    Fetching data from API and store it in Redux Store
    ===================================================*/

    const store = useSelector((state) => state.todoList);
    const dispatch = useDispatch();


    const [todo, setTodo] = useState([]);

    const getData = async (start, end) => {
        await axios.get(`https://jsonplaceholder.typicode.com/todos?_start=${start}&&_end=${end}`).then((resp) => {
            const data = resp.data;
            dispatch(storeData(data))
        })
    }


    useEffect(() => {
        getData(firstItemIndex, lastItemIndex);

    }, [currentPage])

    useEffect(() => {
        setTodo([...store])
    }, [store])



   /*==================================================
                    Filter by Status
    ===================================================*/


    const handleStatus = async(currStatus) => {
         await axios.get(`https://jsonplaceholder.typicode.com/todos?completed=${currStatus}`).then((resp)=>{
            const data = resp.data;
            dispatch(storeData(data))
         })
    }




    return (
        <>
            <div className="table_container">
                <table border="1">
                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todo.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.completed ? "Complete" : "Not Complete"}</td>
                                        <td><button>Edit</button><button>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="operations">
                    <div className="pagination">
                        {
                            currentPage > 1 && currentPage < 21 && <button onClick={() => handlePage(-1)}>Pre</button>
                        }

                        <p>{currentPage}</p>

                        {
                            currentPage > 0 && currentPage < 20 && <button onClick={() => handlePage(1)}>Next</button>
                        }

                    </div>


                    <div className="checkStatus">
                        <select onChange={(event)=>handleStatus(event.target.value)}>
                            <option value="status">Status</option>
                            <option value="true">Complete</option>
                            <option value="false">Not Complete</option>
                        </select>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Todo

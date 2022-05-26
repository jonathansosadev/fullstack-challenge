import React, { useEffect } from 'react';
import { fetchAllData } from './store/slices/data';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { list } = useSelector(state => state.data)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch])

  return (
    <div className="App">
      <Navbar className='Header'>
        React Test App
      </Navbar>
      <Container>
        <Table className='Table' striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {list.map((info) =>
              info.lines.map((line, index) =>
                <tr key={index}>
                  <td key={line.file}>{info.file}</td>
                  <td key={line.text}>{line.text}</td>
                  <td key={line.number}>{line.number}</td>
                  <td key={line.hex}>{line.hex}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Container>

    </div>
  );
}

export default App;

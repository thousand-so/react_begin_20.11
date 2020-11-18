import React, { Component, createRef } from 'react';

class App extends Component {
  id = 1;
  state = {
    username: '',
    password: '',
    list: [],
  }
  usernameInput = createRef(); //레퍼런스를 받을 수 있게하는 어떤걸 만들어줘.

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleInsert = (e) => {
    e.preventDefault();

    const { list, username, password } = this.state;

    this.setState({
      username:'',
      password:'',
      list: list.concat({
        username,
        password,
        id: this.id,
      }),
    })
    this.id++;
    this.usernameInput.focus();
  };
  
  handleDelete = (id) => {
    const copiedList = this.state.list.slice();
    console.log(`copiedList ${copiedList}`);
    const index = this.state.list.findIndex((user) => user.id === id);
    console.log(`index ${index}`);

    copiedList.splice(index, 1);
    console.log(`list ${this.state.list}`);
    
    this.setState({
      list: copiedList,
    })
  }

  render () {
    const { list, username, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleInsert}>
          <input 
            value={username}
            name='username'
            onChange={this.handleChange}
            ref={(ref) => (this.usernameInput = ref)}
          />
          <input value={password} name='password' onChange={this.handleChange} />
          <button type='submit'>추가하기</button>
        </form>
        <ul>
          {list.map((user) => {
            return (
              <li key={user.id}>
                {user.username}의 비밀번호는 {user.password} 입니다. <br />
                <button type='button' onClick={() => this.handleDelete(user.id)}>삭제하기이이이</button>
                {/* handleDelete를 () => 이렇게 감싸주는 이유는 (() handleDelete()) 가 서로 상쇄 () () 돼서. */}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }








}

export default App;

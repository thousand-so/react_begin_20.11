import React, { Component } from 'react';

class App extends Component {
  id = 1; //state, constructor는 render되기 전에 만들어지므로 id를 렌더안에 const로 안박고 위에 선언.
  state = {
    username: '',
    password: '',
    list: [],
  }
  usernameInput = null;

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value, //대괄호x-> 키값을 유지하겠다는말 vs 대괄호->동적으로
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
  
  //batch ; 묶여서 작용
  //dom을 건드릴땐 ref 같이.. 어쩔수 없는 상황에서만. 그 외에는 dom을 건드리지 않는다.
  //usernameInput을 render안에 안넣는 이유는 render될때마다 값이 null이 되기때문. 위에 선언하면 render할 때마다 영향받지않아. id도 마찬가지 영향받지않아.

  render () {
    const { list, username, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleInsert}>
          {/* 버튼에 서브밋하고 폼에 온서브밋하는 이유는 사용자가 클릭이아니고 엔터를 치더라도 작동하게하기 위함. 폼에는 원래 새로고침이 있어야해 엑션에다가 post해서 서버로 날리기때문. 근데 리엑트에서는 우리가 가지고있기때문에 새로고침을 막기위해 e.prevent~ 그리고 포커스를 앞부분(메일폼)으로 이동시키기위해 ref를 가져와서 usernameInput에 불러와 */}
          <input 
            value={username}
            name='username'
            onChange={this.handleChange}
            ref={(ref) => (this.usernameInput = ref)}
          />
          <input vale={password} name='password' onChange={this.handleChange} />
          <button type='submit'>추가하기</button>
        </form>
        <ul>
          {list.map((user) => {
            return (
              <li key={user.id}>
                {user.username}의 비밀번호는 {user.password} 입니다.
              </li>
            )
          })}
        </ul>
      </div>
    )
  }








}

export default App;

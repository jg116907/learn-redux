import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as waitingActions from '../store/modules/waiting'
import WaitingList from '../components/WaitingList';

class WaitingListContainer extends Component {
  // input 변경 이벤트
  handleChange = e => {
    const { WaitingActions } = this.props;
    WaitingActions.changeInput(e.target.value);
  };
  // 등록 이벤트
  handleSubmit = e => {
    e.preventDefault();
    const { WaitingActions, input } = this.props;
    WaitingActions.create(input); // 등록
    WaitingActions.changeInput('') // 인풋 값 초기화
  };
  // 입장
  handleEnter = id => {
    const { WaitingActions } = this.props;
    WaitingActions.enter(id);
  };
  // 나가기
  handleLeave = id => {
    const { WaitingActions } = this.props;
    WaitingActions.leave(id);
  };
  render() {
    const { input, list } = this.props;
    return (
      <WaitingList 
        input={input}
        waitingList={list}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
      />
    );
  }
}

const mapStateToProps = ({ waiting }) => ({
  input: waiting.input,
  list: waiting.list,
});

// 다양한 리덕스 모듈 적용에 유용한 구조
const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingListContainer);
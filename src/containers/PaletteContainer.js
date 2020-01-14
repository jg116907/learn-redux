import React, { Component } from 'react';
import { connect } from 'react-redux';
import Palette from '../components/Palette';
import { changeColor } from '../store/modules/counter';

class PaletteContainer extends Component {
  handleSelect = color => {
    const { changeColor } = this.props;
    console.log('what');
    changeColor(color);
  };
  render() {
    const { color } = this.props;
    return <Palette onSelect={this.handleSelect} selected={color} />;
  }
}

// props로 넣어줄 스토어 상태값
// 스토어 안의 값 -> props
const mapStateToProps = state => ({
  color: state.counter.color,
});

// props로 넣어줄 액션 생성함수
// 액션 생생함수 -> props
const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(changeColor(color)),
});

// 컴포넌트에 리덕스 스토어를 연동해주는 connect 함수
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteContainer);


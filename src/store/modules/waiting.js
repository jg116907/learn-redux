import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

// FSA 규칙에 따른 액션 생성 함수 정의
// export const changeInput = text => ({ type: CHANGE_INPUT, payload: text });
// export const create = text => ({ type: CREATE, payload: text });
// export const enter = id => ({ type: ENTER, payload: id });
// export const leave = id => ({ type: LEAVE, payload: id });

let id = 3;
// createAction을 통한 액션 만들기
// payload 부분의 default는 payload => payload
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ })); // action이 스토어에 dispatch되기 전에 이뤄지도록 함
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

// 초기 상태 정의
const initialState = Map({
  input: '',
  list: List([
    Map({
      id: 0,
      name: '홍길동',
      entered: true,
    }),
    Map({
      id: 1,
      name: '콩쥐',
      entered: false,
    }),
    Map({
      id: 2,
      name: '팥쥐',
      entered: false,
    }),
  ])
});

// handleActions로 리듀서 함수 작성
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => state.set('input',action.payload),
    // ({
    //   ...state,
    //   input: action.payload,
    // }),
    [CREATE]: (state, action) => state.update('list',list => 
      list.push(
        Map({
          id: action.payload.id,
          name: action.payload.text,
          entered: false,
        })
      )
    ),
    // ({
    //   ...state,
    //   list: state.list.concat({
    //     id: action.payload.id,
    //     name: action.payload.text,
    //     entered: false,
    //   }),
    // }),
    [ENTER]: (state, action) => 
    {
      const index = state
        .get('list')
        .findIndex(item => item.get('id') === action.payload);
      return state.updateIn(['list',index,'entered'], entered => !entered);
    },
    // ({
    //   ...state,
    //   list: state.list.map(
    //     item =>
    //       item.id === action.payload
    //       ? { ...item, entered: !item.entered }
    //       : item
    //   ),
    // }),
    [LEAVE]: (state, action) => 
    {
      const index = state
        .get('list')
        .findIndex(item => item.get('id') === action.payload);
      return state.deleteIn(['list',index]);
    },
    // ({
    //   ...state,
    //   list: state.list.filter(item => item.id !== action.payload),
    // }),
  },
  initialState,
);

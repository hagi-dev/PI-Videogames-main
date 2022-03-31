import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Header from "../components/Header/index";
import * as actions from "../redux/action/actionRoot";

configure({ adapter: new Adapter() });

describe("HeaderTest", () => {
  let Header2, useSelectorStub, useSelectorFn;
  const mockStore = configureStore([thunk]);

  const store = () => {
    let state = {
      header: {
        title: "Home",
        text: "pok",
      },
    };
    return mockStore(state);
  };

  beforeEach(() => {
    useSelectorStub = jest.spyOn(ReactRedux, "useSelector");
    useSelectorFn = () => useSelectorStub.mockReturnValue(store().getState().header);
    Header2 = () =>
      mount(
        <ReactRedux.Provider store={store()}>
          <Header />
        </ReactRedux.Provider>
      );
  });

  afterEach(() => jest.restoreAllMocks());

  it("should render Header, tilte, subTitle and img of the theme of the PI", () => {
    useSelectorFn();
    expect(Header2().find("h2").length).toEqual(1);
    expect(Header2().find("h2").text()).toEqual("VIDEOGAMES");
    expect(Header2().find("p").length).toEqual(1);
    expect(Header2().find("p").text()).toEqual("Home");
    expect(Header2().find("img").length).toEqual(1);
  });

  it("should render form with input, label and button submit", () => {
    useSelectorFn();
    expect(Header2().find("form").length).toEqual(1);
    expect(Header2().find("input").length).toEqual(1);
    expect(Header2().find("input").props().type).toEqual("text");
    expect(Header2().find("label").length).toEqual(1);
    expect(Header2().find("button").length).toEqual(1);
    expect(Header2().find("button").props().type).toEqual("submit");
  });

  it("should dispatch actions getVideogameByName in handleSubmit", () => {
    useSelectorFn();
    const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
    const getVideogameByName = jest.spyOn(actions, "getVideogameByName");
    const form = Header2().find('form').first();
    form.simulate('submit');
    Header2();
    expect(useDispatch).toHaveBeenCalled();
    expect(getVideogameByName).toHaveBeenCalled();
  });
});

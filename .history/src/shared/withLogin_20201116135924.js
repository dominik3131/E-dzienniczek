import { React, Component } from "react";
// eslint-disable-next-line import/no-anonymous-default-export
export default (Cmp) => {
  return class extends Component {
    render() {
      return <Cmp {...this.props} />;
    }
  };
};

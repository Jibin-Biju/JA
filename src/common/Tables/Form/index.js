import { Button, Form, Input } from "antd";
import Icons from "../../Icons";
import { useDispatch } from "react-redux";
import { setFiltervalue } from "../../../Store/Features/DataSlice";

const TableForm = () => {
  const dispatch = useDispatch();
  const onFinish = ({ search }) => {
    const val = search.trim();
    if (val.length > 0) dispatch(setFiltervalue(val));
  };

  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: "rmb",
        },
      }}
    >
      <Form.Item name="search">
        <Input
          placeholder="Input anything to search..."
          prefix={<Icons icon={"search"} />}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};
export default TableForm;

import React from 'react';
import { Checkbox, Form, InputNumber, Modal } from 'antd';
const SimpleModal = (props) => {
    const { update, display, setDisplay, needDebounce } = props;
    const [value, setValue] = React.useState(20);
    const [debounce, setDebounce] = React.useState(true);

    return <Modal
        visible={display}
        onCancel={() => setDisplay(false)}
        onOk={() => {
            update(value, debounce)
            setDisplay(false)
        }}
        title="配置长度"
    >
        <Form>
            <Form.Item label="序列长度">
                <InputNumber value={value} onChange={setValue} />
            </Form.Item>
            <Form.Item label="启用防抖" hidden={!needDebounce}>
                <Checkbox checked={debounce} onChange={e => setDebounce(e.target.checked)} />
            </Form.Item>
        </Form>
    </Modal>
}

export default SimpleModal;

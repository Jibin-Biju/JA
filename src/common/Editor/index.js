import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ setvalues, values, defaultvalue }) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [
                { 'list': 'ordered' },
                { 'list': 'bullet' },
                { 'indent': '-1' },
                { 'indent': '+1' }
            ],
            ['link', 'image'],
            ['code'],
            ['clean'],
        ],
        clipboard: { matchVisual: true }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'code'
    ];
    return (
        defaultvalue !== undefined ?
            <ReactQuill
                style={{ marginTop: "1rem", minHeight: "200px" }}
                theme="snow"
                defaultValue={defaultvalue}
                className="ReactQuill"
                onChange={(e) => {
                    setvalues(e)
                }}
                modules={modules}
                formats={formats}
            /> :
            <ReactQuill
                style={{ marginTop: "1rem", }}
                theme="snow"
                className="ReactQuill"
                onChange={(e) => {
                    setvalues(e)
                }}
                modules={modules}
                formats={formats}
            />
    )
}

export default Editor
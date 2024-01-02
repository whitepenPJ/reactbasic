import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MessageBox from "./components/MessageBox";
import { useEffect, useState } from "react";

function App() {
  const url = "http://localhost:5000/posts/";
  const [data, setData] = useState([]);
  const initialDataForm = {
    _id: null,
    title: "",
    tags: [],
    message: "",
    creator: "",
  };
  const [dataForm, setDataForm] = useState(initialDataForm);

  const onEdit = (item) => {
    setDataForm({
      _id: item._id,
      title: item.title,
      tags: item.tags.join(","),
      message: item.message,
      creator: item.creator,
    });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    console.log("onChange", name, value);

    setDataForm({ ...dataForm, [name]: value });
    // setDataForm({ ...dataForm, [name]: value });
    // setDataForm((prev) => {
    //   return { ...prev, [name]: value };
    // });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { _id: id, ...saveData } = { ...dataForm };
    if (saveData.tags) saveData.tags = saveData.tags.split(",");

    fetch(`${url}${id ? "/" + id : ""}`, {
      method: id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    }).then(() => {
      alert("Saved Complete");
      setDataForm(initialDataForm);
      retrieve();
    });
  };

  const onDelete = (_id) => {
    const result = window.confirm("Do you want to delete ?");
    if (result === false) return;

    fetch(`${url}${_id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Deleted Complete");
      retrieve();
    });
  };

  const onClickLike = (_id) => {
    fetch(`${url}${_id}/likePost`, {
      method: "PATCH",
    }).then(() => {
      alert("Liked Complete");
      retrieve();
    });
  };

  const retrieve = () => {
    fetch(url).then(async (response) => {
      const users = await response.json();
      setData(users);
    });
  };

  useEffect(() => {
    // load complete
    retrieve();
  }, []);

  return (
    <>
      <Header></Header>
      <main role="main">
        <div>Hello world!!</div>
        <section className="jumbotron text-left">
          <div className="container">
            <form onSubmit={onSubmitForm}>
              <div className="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  value={dataForm.title}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label for="message">Message</label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  className="form-control"
                  value={dataForm.message}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label for="creator">Creator</label>
                <input
                  type="text"
                  name="creator"
                  id="creator"
                  className="form-control"
                  value={dataForm.creator}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label for="tags">Tags</label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  className="form-control"
                  value={dataForm.tags}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button className="btn btn-block btn-primary">Saved</button>
            </form>

            <pre>{JSON.stringify(dataForm, null, 5)}</pre>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {data.map((item) => (
                <MessageBox
                  {...item}
                  onClickLike={() => onClickLike(item._id)}
                  onDelete={() => onDelete(item._id)}
                  onEdit={() => onEdit(item)}
                ></MessageBox>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;

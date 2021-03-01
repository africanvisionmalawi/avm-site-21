// import PropTypes from "prop-types";
// import { useStaticQuery, graphql } from "gatsby";
import { navigate } from "gatsby-link";
import { styled } from "linaria/react";
import React from "react";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export const MailingForm = () => {
  const [state, setState] = React.useState({});

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  return (
    <FormCont>
      <FormContInner>
        <h3>Join our Mailing List</h3>
        <form
          action="/mailing-list-sucess/"
          name="mailing-list"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <FormInner>
            <FormGroup>
              <TextInput
                type="text"
                name="cm-name"
                id="name"
                placeholder="Name"
                required
                onChange={handleChange}
              />
              <TextInput
                type="email"
                name="email"
                id="fieldEmail"
                placeholder="Email"
                required
                onChange={handleChange}
              />

              <Button className="btn btn-primary" type="submit">
                Join list
              </Button>
            </FormGroup>
          </FormInner>
          <FormExtra>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </FormExtra>
          <input type="hidden" name="form-name" value="mailing-list" />
        </form>
      </FormContInner>
    </FormCont>
  );
};

const FormCont = styled.div`
  background: #f7f7f7;
  border-top: 1px solid #d7dade;
  border-bottom: 1px solid #d7dade;
  margin: 30px 0;
  padding: 30px 0;
`;

const FormContInner = styled.div`
  margin: 0 auto;
  max-width: 980px;
  text-align: center;
  width: 100%;
`;

const FormInner = styled.div`
  display: flex;
  justify-content: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 8px auto 2em;
  width: 90%;
  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: nowrap;
    width: auto;
  }
`;

const FormExtra = styled.div`
  display: none;
`;

const TextInput = styled.input`
  border: none;
  display: inline-block;
  font-size: 1rem;
  padding: 0 8px;
  width: 100%;
  &#name {
    margin-bottom: 6px;
  }
  @media (min-width: 600px) {
    width: auto;
    &#name {
      border-right: 4px solid #f7f7f7;
      margin-bottom: 0;
    }
  }
`;

const Button = styled.button`
  background: #6cbede;
  border: 1px solid #6cbede;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.9em;
  font-weight: bold;
  margin-top: 12px;
  padding: 6px 20px;
  text-align: center;
  :hover {
    background: #58b5d7;
    color: #fff;
  }
  @media (min-width: 600px) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-top: 0;
  }
`;

export default MailingForm;

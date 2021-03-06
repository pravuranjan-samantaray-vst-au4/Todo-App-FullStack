import React, {Component} from 'react'
import { Field,reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { createPost } from "../actions/index";
import swal from 'sweetalert2'


class PostsNew extends Component{
  constructor(props){
    super(props)
    this.onSubmit= this.onSubmit.bind(this)

  }

  renderField(field) {
    if(field.type === 'textarea'){
      return(
        <div className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-error' : ''}`}>
          <label>{field.label}</label>
          <textarea
            {...field.input}
            type="text" className="form-control"
          />
          <div className="help-block">
            {field.meta.touched ? field.meta.error : ''}
          </div>
        </div>
      );
    }
    return (
      <div className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-error' : ''}`}>
        <label>{field.label}</label>

        <input
          {...field.input}
          type="text" className="form-control"
        />
        <div className="help-block">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    this.props.createPost(values, () => {
      const self = this;
      swal({
        title: 'Hurrah',
        text: 'You have successfully created post',
        timer: 2000,
        type: 'success',
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
      }).then(
        function () {},
        // handling the promise rejection
        function (dismiss, props) {
          if (dismiss === 'timer') {
            self.props.history.push("/");
          }
        }
      )

    });
  }
  render(){
    const { handleSubmit } = this.props
    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create A New Todo</h3>
        <hr/>
        <div className="well">
        <Field
          label="Title"
          name="title" component={this.renderField}
        />
        <div className="form-group">
        <Field
          type="textarea"
          label="Content" 
          name="content"
          component={this.renderField}
        />
        </div>
        </div>
        <hr/>
        <div className="clearfix" >
          <button type="submit" className="btn btn-primary btn-lg"> Submit </button>  <Link to="/" className="btn btn-danger btn-lg "> Cancel</Link>
        </div>

      </form>
    )
  }
}
function validate(values) {

  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  return errors;
}



export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew))
import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, ModalBody, ModalHeader, Modal, Row, Col, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from 'react-redux-form';

    const required = (val) => val && val.length;

    const maxLength = (len) => (val) => !(val) || (val.length <= len);

    const minLength = (len) => (val) => (val) && (val.length >= len);

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }    

    handleSubmit(values) {
        this.toggleModal();
        alert("Current state is " + JSON.stringify(values));
    }

    RenderComments( comments ) {

        
        if (comments == null) {
            return (<div></div>)
        }

        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            )
        })

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
            </div>
        )
    }

    RenderDish( dish ) {

        console.log("Render Dish " + dish.image);

        if (dish != null) {
            return (
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
               
            )
        } else {
            return (<div></div>)
        }
    }

    render(){

        return (
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to="/menu">Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active >{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className = "row">
                    <div className="col-12 col-md-5 m-1">
                        {this.RenderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.RenderComments(this.props.comments)}
                        <div>
                            <Button outline onClick = {this.toggleModal} >
                                <span className = "fa fa-pencil fa-lg" />Submit Comment
                            </Button>
                            <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                                <ModalHeader toggle = {this.toggleModal} > Submit Comment </ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
                                        <Row className="form-group">
                                            <Label htmlFor="rating" md={12}>Rating</Label>
                                            <Col md={12}>
                                                
                                                <Control.select model=".rating" name="rating"
                                                    className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Control.select>
                                        
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="author" md={12}>Your Name</Label>
                                            <Col md={12}>
                                                <Control.text model=".author" id="author" name="author"
                                                    placeholder="Your Name"
                                                    className="form-control"
                                                    validators={{
                                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                                    }}
                                                     />
                                                <Errors
                                                    className="text-danger"
                                                    model=".author"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required',
                                                        minLength: 'Must be greater than 2 characters',
                                                        maxLength: 'Must be 15 characters or less'
                                                    }}
                                                 />
                                            </Col>
                                        </Row>

                                        <Row className="form-group">
                                            <Label htmlFor="comment" md={12}>Comment</Label>
                                            <Col md={12}>
                                                <Control.textarea model=".comment" id="comment" name="comment"
                                                    rows="6"
                                                    className="form-control" />
                                            </Col>
                                        </Row>

                                        <Row className="form-group">
                                            <Col md={{size:10, offset: 0}}>
                                                <Button type="submit" color="primary">
                                                Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;
import React from 'react';
import { CardBody, Card, CardImg, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderCard({ item, isLoading, errMess }){

    if(isLoading) {
        return(
            <Loading />
        );
    }

    else if(errMess) {
        return(
            <hr>{ errMess }</hr>
        );
    }

    else {
        return(
            <Card>
                <CardImg src={item.image} alt = {item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function Home(props) {

    return(

        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.dish} 
                        isLoading = { props.dishesLoading } 
                        errMess = { props.dishesErrMess } 
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.promotions} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.leaders} />
                </div>
            </div>
        </div>
    );
}

export default Home;
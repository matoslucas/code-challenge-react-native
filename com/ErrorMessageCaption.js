import React from 'react';
import {  Text } from '@ui-kitten/components';

const ErrorMessageCaption = ({caption, error, validation, value}) =>{
    if(validation(value)){
        return <Text status='info'>{caption}</Text>;
    }else{
        return <Text status='danger'>{error}</Text>
    }
}
export default ErrorMessageCaption;
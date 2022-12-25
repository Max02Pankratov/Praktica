import {MainLayout} from '../../components/MainLayout'
import classes from '../../styles/account/index.module.scss'
import {useForm} from 'react-hook-form'
import React from 'react';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


export default function Account() {

    
    
    const schema = yup.object().shape({
        firstName: yup.string().required("Введите имя"),
        lastName: yup.string().required("Введите фамилию"),
        email: yup.string().email().required("Введите email"),
        age: yup.number().positive().integer().required("Введите корректный возраст"),
        password: yup.string().min(4).max(15).required("Введите пароль"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
    });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });
    
    const submitForm = (data) => {
        console.log(data, 'data_form');
    };


    return (
        <MainLayout title={'account page'}>
            <div className={classes.Fform}>
                <div className={classes.title}>Подтвердите ваши данные</div>
                <div className={classes.inputs}>
                    <form onSubmit={handleSubmit(submitForm)} className={classes.form}>
                        <input type="text" name='firstName' placeholder='введите ваше имя...' className={classes.in} {...register('firstName')}/>
                            <p className={classes.error}>{errors.firstName?.message}</p>
                        <input type="text" name='lastName' placeholder='введите вашу фамилию...' className={classes.in} {...register('lastName')}/>
                            <p className={classes.error}>{errors.lastName?.message}</p>
                        <input type="text" name='email' placeholder='введите ваш email...' className={classes.in} {...register('email')}/>
                            <p className={classes.error}>{errors.email?.message}</p>
                        <input type="text" name='age' placeholder='введите ваш возраст...' className={classes.in} {...register('age')}/>
                            <p className={classes.error}>{errors.age?.message}</p>
                        <input type="password" name='password' placeholder='введите пароль...' className={classes.in} {...register('password')}/>
                            <p className={classes.error}>{errors.password?.message}</p>
                        <input type="password" name='confirmPassword' placeholder='повторите пароль...' className={classes.in} {...register('confirmPassword')}/>
                            <p className={classes.error}>{errors.confirmPassword && "пароли не совпадают"}</p>
                        <input type="submit" className={classes.submit} id="submit"/>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

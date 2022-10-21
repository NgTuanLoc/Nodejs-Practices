import { useState, ChangeEventHandler, FormEventHandler } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { IFormData } from '../../typing';
import { createProductThunk } from '../../features/productThunk';
import {
	StyledContainer,
	StyledFormContainer,
	StyledInput,
	StyledHeading,
	StyledLabel,
	StyledSubmitButton,
} from './style';

const Form = () => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState<IFormData>({
		name: '',
		price: '0',
		images: [],
	});

	const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		const name = e.target.name;
		const value = name === 'images' ? e.target.files : String(e.target.value);

		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	};

	const onSubmitHandler: FormEventHandler = (e) => {
		e.preventDefault();
		dispatch(createProductThunk(formData));
	};

	return (
		<StyledContainer>
			<StyledHeading>File Upload</StyledHeading>
			<StyledFormContainer onSubmit={onSubmitHandler}>
				<StyledLabel htmlFor='name'>Name</StyledLabel>
				<StyledInput name='name' id='name' onChange={onChangeHandler} />
				<StyledLabel htmlFor='price'>Price</StyledLabel>
				<StyledInput
					name='price'
					id='price'
					type='number'
					onChange={onChangeHandler}
				/>
				<StyledLabel htmlFor='images'>Images</StyledLabel>
				<StyledInput
					style={{
						backgroundColor: 'transparent',
						border: 'none',
						paddingLeft: '0',
					}}
					name='images'
					type='file'
					multiple
					id='images'
					onChange={onChangeHandler}
				/>
				<StyledSubmitButton>Add Product</StyledSubmitButton>
			</StyledFormContainer>
		</StyledContainer>
	);
};

export default Form;

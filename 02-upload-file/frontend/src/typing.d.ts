interface IProduct {
	_id: string;
	name: string;
	price: number;
	images: string[];
}

interface IFormData {
	name: string;
	price: string;
	images: File[];
}

export { IProduct, IFormData };

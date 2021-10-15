import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {
	const isMounted = useRef(true);
	const [ state, setState ] = useState({ data: null, loading: true, error: null });

	useEffect(() => {
		return () => {
			//Solo se esta manteniendo la referencia al componente
			isMounted.current = false;
		};
	}, []);

	useEffect(
		() => {
			setState({ data: null, loading: true, error: null });

			fetch(url)
				.then((resp) => resp.json())
				.then((data) => {
					//no deberia ir con el set timeout
					//setTimeout(() => {

					if (isMounted.current) {
						setState({
							loading: false,
							error: null,
							data
						});
					}
					// else{
					//     console.log('SetState no se llamo')
					// }

					//}, 4000);
				})
				.catch(() => {
					setState({ data: null, loading: false, error: 'No se pudo cargar la informacion' });
				});
		},
		[ url ]
	);

	return state;
};

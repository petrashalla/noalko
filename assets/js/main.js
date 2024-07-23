// animation
const animationItems = document.querySelectorAll('.animation-item')
if (animationItems.length > 0) {
	function onEntry(e) {
		e.forEach(e => {
			e.isIntersecting && e.target.classList.add('animation-active')
		})
	}
	let options = {
			threshold: [0.5],
		},
		observer = new IntersectionObserver(onEntry, options)
	for (let e of animationItems) observer.observe(e)
}



//  scroll hide header
let scrollWidthFunc = () => {
	let scrollWidth = window.innerWidth - document.body.clientWidth
	document.querySelector('html').style.paddingRight = scrollWidth + 'px'
	document.querySelector('header').style.paddingRight = scrollWidth + 'px'
}
const scrollTop = document.querySelector('.scroll-top')
if (scrollTop)
	scrollTop.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
;['load', 'resize'].forEach(event => {
	window.addEventListener(event, function () {
		let headerHeight = header.clientHeight
		const headerTop = header.querySelector('.header__top')
		const headerBottom = header.querySelector('.header__bottom_row')
		const scrollUpBtn = document.querySelector('.scroll-up')
		if (headerTop) {
			var originalHeightheaderTop = headerTop.offsetHeight
		}
		window.onscroll = function (e) {
			if (window.innerWidth > 1000) {
				if (window.scrollY > headerHeight) {
					if (!headerTop.classList.contains('hide')) {
						headerTop.classList.add('hide')
						headerTop.style.height = '0px'

						headerBottom.classList.add('scroll')
						scrollUpBtn.classList.add('active')
					}
				} else {
					headerTop.style.height = originalHeightheaderTop + 'px'
					headerTop.classList.remove('hide')
					headerBottom.classList.remove('scroll')
					scrollUpBtn.classList.remove('active')
				}
			}

			if (window.scrollY > headerHeight) {
				if (!headerTop.classList.contains('hide')) {
					scrollUpBtn.classList.add('active')
				}
			} else {
				scrollUpBtn.classList.remove('active')
			}
		}
	})
})
// end scroll hide header

document.addEventListener('DOMContentLoaded', function () {
	const burgerMenu = document.querySelector('.burger__menu')
	if (burgerMenu) {
		const headerMobile = document.querySelector('.header__bottom')
		const header = document.querySelector('.header')
		burgerMenu.addEventListener('click', () => {
			if (burgerMenu.classList.contains('burger__menu--active')) {
				document.body.classList.remove('lock')
			} 
			headerMobile.classList.toggle('header__bottom--active')
			burgerMenu.classList.toggle('burger__menu--active')
			header.classList.toggle('header--active')

			document.querySelector('html').classList.toggle('burger-lock')
		})
	}

	/* Mask phone */
	;[].forEach.call(
		document.querySelectorAll('input[type=tel]'),
		function (input) {
			let keyCode
			function mask(event) {
				event.keyCode && (keyCode = event.keyCode)
				let pos = this.selectionStart
				if (pos < 3) event.preventDefault()
				let matrix = '+7 (___) ___ ____',
					i = 0,
					def = matrix.replace(/\D/g, ''),
					val = this.value.replace(/\D/g, ''),
					new_value = matrix.replace(/[_\d]/g, function (a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
					})
				i = new_value.indexOf('_')
				if (i != -1) {
					i < 5 && (i = 3)
					new_value = new_value.slice(0, i)
				}
				let reg = matrix
					.substr(0, this.value.length)
					.replace(/_+/g, function (a) {
						return '\\d{1,' + a.length + '}'
					})
					.replace(/[+()]/g, '\\$&')
				reg = new RegExp('^' + reg + '$')
				if (
					!reg.test(this.value) ||
					this.value.length < 5 ||
					(keyCode > 47 && keyCode < 58)
				)
					this.value = new_value
				if (event.type == 'blur' && this.value.length < 5) this.value = ''
			}

			input.addEventListener('input', mask, false)
			input.addEventListener('focus', mask, false)
			input.addEventListener('blur', mask, false)
			input.addEventListener('keydown', mask, false)
		}
	)
	/* End Mask phone */





	// let nameInput = document.getElementById('intro-name');
	// let nameError = document.getElementById('name-error');
	
	// nameInput.addEventListener('input', function(event) {
	// 	let value = this.value;
	// 	let regex = /^[а-яёА-ЯЁ\s]*$/;
		
	// 	if (!regex.test(value)) {
	// 		this.value = value.replace(/[^а-яёА-ЯЁ\s]/g, '');
	// 		nameError.style.display = 'block';  // Показать сообщение об ошибке
	// 	} else {
	// 		nameError.style.display = 'none';   // Скрыть сообщение об ошибке
	// 	}
	// });


	    // Функция для обработки ошибок
		function handleNameInput(event) {
			let input = event.target;
			let value = input.value;
			let errorMessage = input.nextElementSibling;
	
			let regex = /^[а-яёА-ЯЁ\s]*$/;
			
			if (!regex.test(value)) {
				input.value = value.replace(/[^а-яёА-ЯЁ\s]/g, '');
				errorMessage.style.display = 'block'; 
			} else {
				errorMessage.style.display = 'none'; 
			}
		}
		document.querySelectorAll('.name-input').forEach(function(input) {
			input.addEventListener('input', handleNameInput);
		});








	/*  Popups  */
	function popupClose(popupActive) {
		popupActive.classList.remove('open')
		document.body.classList.remove('lock')
		document.querySelector('html').removeAttribute('style')
		document.querySelector('html').classList.remove('lock')
		document.querySelector('header').removeAttribute('style')
	}

	const popupOpenBtns = document.querySelectorAll('.popup-btn')
	const popups = document.querySelectorAll('.popup')
	const closePopupBtns = document.querySelectorAll(
		'.close-popup, .popup__btn-ok'
	)
	closePopupBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			popupClose(e.target.closest('.popup'))
		})
	})

	popupOpenBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault()
			const path = e.currentTarget.dataset.path
			const currentPopup = document.querySelector(`[data-target="${path}"]`)
			if (currentPopup) {
				popups.forEach(function (popup) {
					popupClose(popup)
					popup.addEventListener('click', function (e) {
						if (!e.target.closest('.popup__content')) {
							popupClose(e.target.closest('.popup'))
						}
					})
				})
				currentPopup.classList.add('open')
				document.querySelector('html').classList.add('lock')
			}
		})
	})
	/*  end popups  */

	/* yandex map */
	let flagMap = false;
	document.addEventListener('scroll', function () {
		const blockMap = document.getElementById('map1'); // Проверяем первую карту
		if (blockMap) {
			const posTop = blockMap.getBoundingClientRect().top;
	
			if (posTop < window.innerHeight && !flagMap) {
				if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
					const script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
					document.head.appendChild(script);
				}
				setTimeout(function () {
					ymaps.ready(init);
					function init() {
						const map1 = document.querySelector('#map1');
						const map2 = document.querySelector('#map2');
						if (map1) {
							var myMap1 = new ymaps.Map('map1', {
								center: [59.922170, 30.347049],
								zoom: 15,
								controls: [],
							});
	
							var myPlacemark1 = new ymaps.Placemark(
								myMap1.getCenter(),
								{
									hintContent: 'Клиника "Результат"',
									balloonContent: 'Клиника "Результат"',
								}
							);
	
							myMap1.geoObjects.add(myPlacemark1);
							myMap1.behaviors.disable(['scrollZoom']);
						}
	
						if (map2) {
							var myMap2 = new ymaps.Map('map2', {
								center: [55.755864, 37.617698],
								zoom: 5,
								controls: [],
							});
	
							var placemarks = [
								[59.930000, 30.350000, 'Клиника "Результат"'],
								[55.755864, 37.617698, 'Клиника "Результат"'],
								[54.513678, 36.261341, 'Клиника "Результат"'],
								[54.193122, 37.617348, 'Клиника "Результат"'],
								[54.629221, 39.737111, 'Клиника "Результат"']
							];
	
							placemarks.forEach(function (coords) {
								var placemark = new ymaps.Placemark(
									[coords[0], coords[1]],
									{
										hintContent: coords[2],
										balloonContent: coords[2],
									}
								);
								myMap2.geoObjects.add(placemark);
							});
						}
					}
				}, 500);
				flagMap = true;
			}
		}
	});
	/* end yandex map */

	/*  FAQ  */
	const acc = document.getElementsByClassName('faq__accordion')
	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function () {
			this.classList.toggle('faq__accordion--active')
			const faqBtn = this.querySelector('.faq__more')
			faqBtn.classList.toggle('faq__more--active')
			const panel = this.nextElementSibling
			if (panel.style.display === 'block') {
				panel.style.display = 'none'
			} else {
				panel.style.display = 'block'
			}
		})
	}
	/*  End FAQ   */


	/*  Slaider  */
	const servicesSwiper = new Swiper('.servicesSwiper', {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: '.services__swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			680: {
				slidesPerView: 6,
			},
		},
	})




const stagesSwiper = new Swiper('.stagesSwiper', {
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: '.stages__swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		800: {
			slidesPerView: 8,
		},
	},
})

if (window.innerWidth < 800) {
	servicesSwiper.enable()
	stagesSwiper.enable()
} else {
	servicesSwiper.disable()
	stagesSwiper.disable()
}


	const doctorsSwiper = new Swiper('.doctorsSwiper', {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: '.doctors__swiper-pagination',
			clickable: true,
		},
	})

	const commentsSwiper = new Swiper('.commentsSwiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		pagination: {
			el: '.comments__swiper-pagination',
			clickable: true,
		},
	})

	const licenseSwiper = new Swiper('.licenseSwiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		pagination: {
			el: '.licenses__swiper-pagination',
			clickable: true,
		},

		breakpoints: {
			800: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			500: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	})
	/*  End slaider  */


	/* close popup-cookie */
	document
		.getElementById('popup__cookie_btn')
		.addEventListener('click', function () {
			document.getElementById('popup__cookie').style.display = 'none'
		})
})


/*  pop-up menu  */
document.addEventListener('DOMContentLoaded', function () {
	const list = document.querySelectorAll('.hide-item')
	const sublinkButtons = document.querySelectorAll('.header__sublink_button')

	function accordion(e) {
		e.stopPropagation()
		const isActive = this.classList.contains('hide-item--active')
		list.forEach(item => item.classList.remove('hide-item--active'))
		if (!isActive) {
			this.classList.add('hide-item--active')
		}
	}

	list.forEach(item => {
		item.addEventListener('click', accordion)
	})

	document.addEventListener('click', function (e) {
		if (!e.target.closest('.header__bottom_nav')) {
			document.querySelectorAll('.hide-item--active').forEach(item => {
				item.classList.remove('hide-item--active')
			})
			document
				.querySelectorAll('.header__subsubmenu_wrapper')
				.forEach(wrapper => {
					wrapper.classList.remove('show')
				})
		}
	})

	document.querySelectorAll('.header__subsubmenu_wrapper').forEach(wrapper => {
		wrapper.addEventListener('click', function (e) {
			e.stopPropagation()
		})
	})
})
/*  end pop-up menu  */



/*   tabs  */
const showTab = elTabBtn => {
	const elTab = elTabBtn.closest('.tab')
	if (elTabBtn.classList.contains('tab__btn--active')) {
		return
	}
	const targetId = elTabBtn.dataset.id
	const elTabPane = elTab.querySelectorAll(`.tabcontent[data-id="${targetId}"]`)
	console.log(elTabPane)

	for (let i = 0; i < elTabPane.length; i++) {
		if (elTabPane[i]) {
			const elTabBtnActive = document.querySelector('.tab__btn--active')
			elTabBtnActive.classList.remove('tab__btn--active')

			const elTabPaneShow = document.querySelectorAll('.tabcontent--active')
			for (let j = 0; j < elTabPaneShow.length; j++) {
				elTabPaneShow[j].classList.remove('tabcontent--active')
			}
			elTabBtn.classList.add('tab__btn--active')
			// elTabPane[i].classList.add('tabcontent--active');

			for (let j = 0; j < elTabPaneShow.length; j++) {
				elTabPane[j].classList.add('tabcontent--active')
			}
		}
	}
}
document.addEventListener('click', e => {
	if (e.target && !e.target.closest('.tab__btn')) {
		return
	}
	const elTabBtn = e.target.closest('.tab__btn')
	showTab(elTabBtn)
})
/*   end tabs  */


/*  search city */
document.addEventListener('DOMContentLoaded', function () {
	let inputSearch = document.querySelectorAll('input[type=search]')
	if (inputSearch.length > 0) {
		inputSearch.forEach(elem => {
			const wrapper = elem.closest('.search-wrapper')
			if (wrapper) {
				const searchResultBlock = wrapper.querySelector('.popup__search-result')
				const popularCitiesBlock = wrapper.querySelector('.popup__search-city')
				const noResultsMessage = searchResultBlock.querySelector(
					'.no-results-message'
				)

				function search() {
					let filter = elem.value.toUpperCase()
					let ul = wrapper.querySelectorAll('.search-list')
					let totalResults = 0

					ul.forEach(item => {
						let li = item.getElementsByTagName('li')
						for (let i = 0; i < li.length; i++) {
							let a = li[i].querySelector('.search-name')
							if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
								li[i].classList.remove('none')
								totalResults++
							} else {
								li[i].classList.add('none')
							}
						}
					})
					if (elem.value.trim() === '') {
						searchResultBlock.classList.add('none')
						popularCitiesBlock.classList.remove('none')
					} else {
						searchResultBlock.classList.remove('none')
						popularCitiesBlock.classList.add('none')
					}
					if (totalResults === 0 && elem.value.trim() !== '') {
						noResultsMessage.classList.remove('none')
					} else {
						noResultsMessage.classList.add('none')
					}
				}
				elem.addEventListener('input', search)
			}
		})
	}
})
/*  end search  */


/*   scrollTop  */
document.addEventListener('DOMContentLoaded', function () {
	const buttonUp = document.querySelector('.scroll-up')
	buttonUp.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})
})
/*   end scrollTop  */

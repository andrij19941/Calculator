(function() {
	"use strict";

	// Тут починаємо писати код

	// Функция для отримання елементів
	const el = function(element) {
		if (element.charAt(0) === "#") { // Перевіряємо селектор на присутність символа "#", що значить треба відібрати атрибут id=""
			return document.querySelector(element); // ... повертаємо один елемент
		}

		return document.querySelectorAll(element); // В іншому випадку повертаємо масив елементів
	};

	// Функція, яка відбере цифру коли клікаємо по номеру
	const setNum = function() {

		if (resultNum) { // Якщо відображався результат, скидуємо номер
			theNum = this.getAttribute("data-num");
			resultNum = "";
		} else {  
			theNum += this.getAttribute("data-num");
		}

		if (theNum.length >= 2 && theNum.charAt(0) === "0" && theNum.charAt(1) !== "."){
			theNum = theNum.slice(1);
		}
		
		viewer.innerHTML = theNum; // Відображення поточнї цифри. innerHTML властивість повністю заміняє вміст html елемента

	};

	// Функція, яка відбере стару цифру і збереже оператор
	let moveNum = function() {
		oldNum = theNum;
		theNum = "";
		operator = this.getAttribute("data-ops");
	};

	// При кліку на дорівнює обрахувати результат
	let displayNum = function() {

		// Перетворити текст у числа
		oldNum = parseFloat(oldNum); 
		theNum = parseFloat(theNum); 
		// Вибір операції
		switch (operator) {
			case "plus":
				resultNum = oldNum + theNum;
				break;

			case "minus":
				resultNum = oldNum - theNum;
			

			case "times":
				resultNum = oldNum * theNum;
				break;

			case "divided by":
				resultNum = oldNum / theNum;
				break;

			default:
				resultNum = theNum;
		}

		// Перевірка на повернення NaN або Infinity
		if (!isFinite(resultNum)) {
			if (isNaN(resultNum)) { // Якщо результат не є числом; Наприклад, подвійним клацанням операторів
				resultNum = "Ви його зламали!";
			} else { // Якщо результат нескінченний, йдемо шляхом ділення на нуль
				resultNum = "Подивіться, що ви зробили";
				el("#calculator").classList.add("broken"); // Зупинити калькулятор
				el("#reset").classList.add("show"); // І показати кнопку скидання
			}
		}
		
		viewer.innerHTML = resultNum;

		// Тепер скиньте oldNum і збережіть результат
		oldNum = 0;
		theNum = resultNum;
	}



	// Змінні з якими буде працювати калькулятор
	let viewer = el("#viewer"), 
		equals = el("#equals"), 
		nums = el(".num"),      
		ops = el(".ops"),       
		theNum = "",            
		oldNum = "",           
		resultNum,              
		operator;               

	// Слідкуємо за подією натискання кліка на цифру
	for (let i = 0, l = nums.length; i < l; i++) {
		nums[i].onclick =  setNum; // При кліку будемо запускати функцію setNum
	}

	// Слідкуємо за подією натискання кліка на оператор
	for (let i = 0, l = ops.length; i < l; i++) {
		ops[i].onclick = moveNum;
	}

	// Додаємо подію кліку до знака дорівнює
	equals.onclick = displayNum;


	// Подія кліку до кнопки скидання
	el("#reset").onclick = function() {
		window.location = window.location;
	};

	// Подія кліку до кнопки 
	el('#clear').onclick = function() {
		oldNum = "";
		theNum = "";
		viewer.innerHTML = "0";
	} 

}()); // Чекаємо завантаження html сторінки і потім викликаємо наш код
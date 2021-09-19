window.addEventListener("load", () => { 
	 
	document.getElementById("porte").onmouseenter = event => {
		document.getElementById("porte").style.opacity = 1;
	}

	document.getElementById("porte").onmouseleave = event => {
		document.getElementById("porte").style.opacity = 0;
	}

	document.getElementById("left").onmouseenter = event => {
		document.getElementById("left").style.opacity = 0;
	}

	document.getElementById("left").onmouseleave = event => {
		document.getElementById("left").style.opacity = 1;
	}

	document.getElementById("right").onmouseenter = event => {
		document.getElementById("right").style.opacity = 0;
	}

	document.getElementById("right").onmouseleave = event => {
		document.getElementById("right").style.opacity = 1;
	}
    
})



const applyStyles = iframe => {
	let styles = {
		fontColor : "orange",
		backgroundColor : "#000000",
		fontSize : "20px"
		
	}
	
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}

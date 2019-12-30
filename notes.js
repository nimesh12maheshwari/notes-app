const fs=require('fs')
const chalk=require('chalk')

const addNote= (title,body)=>{
	const notes=loadNotes()
	const duplicateNotes=notes.filter((note)=>note.title===title)
	debugger
	if(duplicateNotes.length===0){
		notes.push({
			title:title,
			body:body
		})
		saveNotes(notes)
		console.log(chalk.green.inverse('New note added!'))
	}
	else{
		console.log(chalk.red.inverse('Title already taken!'))
	}
}

const removeNote=(title)=>{
	const notes=loadNotes()
	const newNotes=notes.filter((note)=>note.title !== title)
	
	if(newNotes.length < notes.length){
		console.log(chalk.green.inverse('Note removed!'))
		saveNotes(newNotes)
	}
	else{
		console.log(chalk.red.inverse('No note found!'))
	}
}

const listNotes=()=>{
	console.log(chalk.blue.inverse("Your Notes:"))
	const notes=loadNotes()
	notes.forEach((notes)=>{
		console.log('title: '+notes.title)
	})
}

const readNote=(title)=>{
	const notes=loadNotes()
	const find=notes.find((note)=>note.title===title)

	if(find){
		console.log(chalk.inverse(title))
		console.log(find.body)
	}
	else{
		console.log(chalk.red.inverse('Error'))
	}
}

const saveNotes=(notes)=>{
	const dataJSON=JSON.stringify(notes) 
	fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes=()=>{
	try{
		const dataBuffer=fs.readFileSync('notes.json')
		const dataJSON=dataBuffer.toString()
		return JSON.parse(dataJSON)
	}catch{
		return []
	}
}

module.exports={
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}
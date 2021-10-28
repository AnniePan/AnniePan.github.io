let todoListArray = [];
window.onload = function() {
    checklocalStorage();

    document.querySelector('.wrapper').addEventListener('click', (evt)=>{
        //console.log(evt.target);
    
        let addBox = document.querySelector('.inputField input');
        let editBox = document.querySelector('.edit');
        let todoList = document.querySelector('.todoList');
    
        //add
        if((evt.target.parentNode.classList.contains('add') || evt.target.classList.contains('add')) && addBox.value !== ''){
            let newEle = document.createElement('li');
            newEle.innerHTML = templateItem(addBox.value);
            newEle.setAttribute('data-index', todoList.querySelectorAll('li').length);
            document.querySelector('.todoList').appendChild(newEle);
            todoListArray.push(addBox.value);
            savelocalStorage();
            addBox.value = '';
        }
    
        //edit
        if(evt.target.classList.contains('editicon') || evt.target.parentNode.classList.contains('editicon')){
            let liNode = (evt.target.className === 'editicon') ? 
                          evt.target.parentNode : 
                          evt.target.parentNode.parentNode;
    
            let text = liNode.innerText;
    
            editBox.className = 'edit';
            editBox.querySelector("input").value = text;
            
            //edit done
            editBox.addEventListener('click', (e)=>{
                if(e.target.classList.contains('add') && 
                   ((evt.target.parentNode !== null && evt.target.classList.contains('editicon')) || evt.target.parentNode.parentNode !== null)){
                    editBox.classList.add('disNone');
    
                    let itemHtml = templateItem(editBox.querySelector("input").value);
                    let index = 0;
    
                    if(evt.target.className === 'editicon'){
                       index = Number(evt.target.parentNode.getAttribute('data-index'));
                       evt.target.parentNode.innerHTML = itemHtml;
                    } else {
                       index = Number(evt.target.parentNode.parentNode.getAttribute('data-index'));
                       evt.target.parentNode.parentNode.innerHTML = itemHtml;
                    }
    
                    todoListArray[index] = editBox.querySelector("input").value;
                    savelocalStorage();
                }
            })
        }
    
        //delete
        if(evt.target.classList.contains('deleted') || evt.target.parentNode.classList.contains('deleted')){
            let index = 0;
            if(evt.target.classList.contains('deleted')){
                index = Number(evt.target.parentNode.getAttribute('data-index'));
                evt.target.parentNode.remove(evt.target.parentNode);
            }else{
                index = Number(evt.target.parentNode.parentNode.getAttribute('data-index'));
                evt.target.parentNode.parentNode.remove(evt.target.parentNode.parentNode);
            }
    
            todoListArray.splice(index, 1);
            index = 0;
    
            document.querySelectorAll('.todoList li').forEach(ele => {
                ele.setAttribute('data-index', index.toString());
                index++;
            });
            savelocalStorage();
        }
    
        //delete all
        if(evt.target.classList.contains('deletedAll')){
            todoList.innerHTML = '';
            dellocalStorage();
        }
    });

    
}

var templateItem = text => {
    let itemHtml = `${text}
                          <span class='editicon'>
                            <i class='fas fa-pencil-alt'></i>
                          </span>
                          <span class='icon deleted'>
                            <i class='fas fa-trash'></i>
                          </span>`;
    return itemHtml;
}

var checklocalStorage = () => {
    let localTodoList = JSON.parse(localStorage.getItem('todoList'));
    if(localTodoList !== null){
        localTodoList.forEach(function(value, index){
            let newEle = document.createElement('li');
            newEle.innerHTML = templateItem(value);
            newEle.setAttribute('data-index', index);
            document.querySelector('.todoList').appendChild(newEle);
            todoListArray.push(value);
        });
    }
}
var savelocalStorage = () => localStorage.setItem('todoList', JSON.stringify(todoListArray))
var dellocalStorage = () => localStorage.removeItem('todoList');




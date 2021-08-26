function getOrder(start, end)
{
	// initialize the order
	myorder = [];
	arr = [];
	for(i = start; i < end + 1; i++)
	{
		arr.push(i);
	}
	var index = arr.length - 1
	while (index >= 0) {
		var num = Math.floor(Math.random() * index);
		myorder.push(arr[num])
		arr[num] = arr[index]
		index--;
	}
	temp = myorder[0];
	myorder[0] = myorder[1];
	myorder[1] = temp;
	return myorder;
}

function Validate(myorder)
{
	// check the order is lawful
	var length = myorder.length;
	sum = 0;
	for(i = 1; i < length; i++)
	{
		for(j = 0; j < i; j++)
		{
			if(myorder[j] > myorder[i])
			{
				sum++;
			}
		}
	}
	if (sum % 2 === 0) {
		return true;
	} else {
		return false;
	}
}

function Init(order = []){
	var body = $('#main');
	body.empty()
	for(let i = 0; i < 3; i++)
	{
		for(let j = 0; j < 3; j++)
		{
			if (i === 2 && j===2)
				break
			let idx = 0
			if(order.length === 0){
				idx = i * 3 + j + 1
			} else {
				idx = order[i * 3 + j]
			}
			let newDom = $('<div></div>')
			newDom.css('left', 'calc(' + j * 33 + 'vh)')
			newDom.css('top', 'calc(' + i * 33 + 'vh)')
			newDom.attr('label', idx)
			newDom.attr('x', i)
			newDom.attr('y', j)
			let img = $('<img>')
			img.attr('src', 'img/' + idx + '.jpg')
			newDom.append(img)
			body.append(newDom)
		}
	}
}

function setClick() {
	domLists = $('#main').find("div");
	domLists.on('click',function(){
		var $this = $(this);
		// Click Dom and Block Dom in the same line
		let movedDistance = $(this).width()
		let orderIdx = parseInt($this.attr('x')) * 3 + parseInt($this.attr('y'))
		let blockIdx = parseInt(BlockX) * 3 + parseInt(BlockY)
		orders[blockIdx] = parseInt($this.attr('label'))
		orders[orderIdx] = 9
		if(parseInt($this.attr('x')) === BlockX)
		{
			if(parseInt($this.attr('y') - BlockY) === -1)
			{
				clearMoved();
				leftPX = $this.css("left");
				leftPX = parseInt(leftPX.split('p')[0]) + movedDistance;
				leftPX = leftPX + 'px';
				$this.animate({
					left : leftPX
				},200);
				BlockY -= 1;
				$this.attr('y',(parseInt($this.attr('y')) + 1));
				$this.attr('moved','moved');
			}
			else if(parseInt($this.attr('y') - BlockY) === 1)
			{
				clearMoved();
				leftPX = $this.css("left");
				leftPX = parseInt(leftPX.split('p')[0]) - movedDistance;
				leftPX = leftPX + 'px';
				$this.animate({
					left : leftPX
				},200);
				BlockY += 1;
				$this.attr('y',(parseInt($this.attr('y')) - 1));
				$this.attr('moved','moved');
			}
		}
		// Click Dom and Block Dom in the same row
		if(parseInt($this.attr('y')) === BlockY)
		{
			if(parseInt(($this.attr('x') - BlockX)) === -1)
			{
				clearMoved();
				topPX = $this.css("top");
				topPX = parseInt(topPX.split('p')[0]) + movedDistance;
				topPX = topPX + 'px';
				$this.animate({
					top : topPX
				},200);
				BlockX -= 1;
				$this.attr('x',(parseInt($this.attr('x')) + 1));
				$this.attr('moved','moved');
			}
			else if(($this.attr('x') - BlockX) === 1)
			{
				clearMoved();
				topPX = $this.css("top");
				topPX = parseInt(topPX.split('p')[0]) - movedDistance;
				topPX = topPX + 'px';
				$this.animate({
					top : topPX
				},200);
				BlockX += 1;
				$this.attr('x',(parseInt($this.attr('x')) - 1));
				$this.attr('moved','moved');
			}
		}
		if(ManHattan(orders) === 0) {
			setTimeout(function (){
				$('#control').css('display', 'block')
			}, 200)
			if(BeginDate == null) { return }
			let EndDate = new Date();
			let timeUsed =  EndDate.getTime() - BeginDate.getTime();
			timeUsed /= 1000;
			timeUsed = timeUsed.toFixed(2)
			$.messager.lays(400, 70);
			$.messager.anim('fade', 1000);
			$.messager.show(0, 'You Win! Time Used : ' + timeUsed.toString() + 's');
		}

	})
}

function getIndex(arr, item)
{
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i] === item)
			return i;
	}
	return null;
}

function ManHattan(arr)
{
	var cost = 0;
	for(var i = 0; i < arr.length; i++)
	{
		idx = getIndex(arr, i + 1);
		now_x = Math.floor(idx / 3);
		now_y = idx % 3;
		goal_x = Math.floor(i / 3);
		goal_y = i % 3;
		cost += Math.abs(now_x - goal_x);
		cost += Math.abs(now_y - goal_y);
	}
	return cost;
}

function clearMoved() {
	$('#main').find("div").attr('moved', 'off');
}

function clickDomItem(idx, domLists)
{
	domLists.each(function (){
		if (parseInt($(this).attr('label')) === idx)
			$(this).click()
	})
	return null;
}

function getMove(father)
{
	if(father === null)
	{
		return 0;
	}
	else
	{
		return father.move + 1
	}
}

function getChange(father, space)
{
	if(father === null)
	{
		return 0;
	}
	else
	{
		return father.arr[space]
	}
}

function neighbor(arr, space)
{
	var space_x = Math.floor(space / 3);
	var space_y = space % 3;
	var neighbors = [];
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			if((i === space_x && Math.abs(space_y - j) === 1) || (j === space_y && Math.abs(space_x - i) === 1))
			{
				item = arr.concat();
				item[space] = arr[i * 3 + j];
				item[i * 3 + j] = 9;
				neighbors.push(item)
			}
		}
	}
	return neighbors;
}

function getMin(visited)
{
	var min = visited[0].priority;
	var idx = visited[0]
	for(var i = 1; i < visited.length; i++)
	{
		if(min > visited[i].priority)
		{
			min = visited[i].priority;
			idx = visited[i];
		}
		if(min === visited[i].priority && idx.manhattan < visited[i].manhattan)
		{
			idx = visited[i];
		}
	}
	return idx;
}

function remove(visited, item)
{
	for(var i = 0; i < visited.length; i++)
	{
		if(visited[i].arr.toString() === item.arr.toString())
			break;
	}
	for(var j = i; j < visited.length - 1; j++)
	{
		visited[j] = visited[j + 1];
	}
	visited.length--;
}

function Auto()
{
	var initorder = orders.concat();
	var father = null;
	var init_Node = {
		arr : initorder,
		space : getIndex(initorder, 9),
		father : father,
		move : getMove(father),
		manhattan : ManHattan(initorder),
		//operate : getOperate(getIndex(initorder, 9), getIndex(father.arr, 9)),
		change : getChange(father, getIndex(initorder, 9)),
		priority : getMove(father) + ManHattan(initorder),
		neighbors : neighbor(initorder, getIndex(initorder, 9))
	}
	var visited = [];
	visited.push(init_Node);
	var curr_Node = getMin(visited);
	var count = 0;
	while(curr_Node.manhattan > 0)
	{
		// console.log(curr_Node)
		for(var i = 0; i < curr_Node.neighbors.length; i++)
		{
			if(curr_Node.father == null || curr_Node.father.arr.toString() !== curr_Node.neighbors[i].toString())
			{
				var Node = {
					arr : curr_Node.neighbors[i],
					space : getIndex(curr_Node.neighbors[i], 9),
					father : curr_Node,
					move : getMove(curr_Node),
					manhattan : ManHattan(curr_Node.neighbors[i]),
					change : getChange(curr_Node, getIndex(curr_Node.neighbors[i], 9)),
					priority : getMove(curr_Node) + ManHattan(curr_Node.neighbors[i]),
					neighbors : neighbor(curr_Node.neighbors[i], getIndex(curr_Node.neighbors[i], 9))
				}
				visited.push(Node);
			}
		}
		// console.log(visited)
		remove(visited, curr_Node);
		curr_Node = getMin(visited);
		// console.log(curr_Node)
		count += 1;
		if(count > 10000)
			return [];
	}
	var changes = [];
	while(curr_Node.father != null)
	{
		changes.push(curr_Node.change)
		curr_Node = curr_Node.father
	}
	// console.log(changes)
	return changes
}

function NewGame(){
	$('#control').css('display', 'none')
	orders = getOrder(1, 8);
	while(!Validate(orders)) //  || ManHattan(orders) > 15
	{
		orders = getOrder(1, 8);
	}
	orders.push(9);
	Init(orders)
	BeginDate = new Date();
	setClick()
}

function AutoGame(){
	$('#control').css('display', 'none')
	orders = getOrder(1, 8);
	while(!Validate(orders)) //  || ManHattan(orders) > 15
	{
		orders = getOrder(1, 8);
	}
	orders.push(9);
	Init(orders)
	BeginDate = null;
	setClick()

	var AutoList = Auto();
	// console.log(AutoList)
	if(AutoList.length > 0)
	{
		var AUTO = setInterval(function(){
			if(AutoList.length > 0)
			{
				clickDomItem(AutoList.pop(), domLists);
			}
			else
			{
				clearInterval(AUTO);
			}
		}, 500);
	}
	else
	{
		setTimeout(function (){
			$('#control').css('display', 'block')
		}, 200)
		// alert('List Error!');
		$.messager.lays(200, 70);
		$.messager.anim('fade', 1000);
		$.messager.show(0, 'List Error!');
	}
}

var BlockX = 2;
var BlockY = 2;
var orders = [1,2,3,4,5,6,7,8,9];
var domLists = []
var BeginDate = null

$(window).on('load',function(){
	Init();
	$('#NewGame').on('click',function(){
		NewGame();
	});
	$('#AutoGame').on('click',function(){
		AutoGame();
	});
});

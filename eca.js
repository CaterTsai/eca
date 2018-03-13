var cCodeSize = 8;

var eca = function() 
{
    this.isSetup = false;
}

eca.prototype.setup = function(colSize, maxRowSize, code, pattern)
{
    this.code = Math.min(Math.max(code, 0), 255);
    this.decode = [];
    this.maxRowSize = maxRowSize;
    this.colSize = colSize;

    for(var i = 0; i < cCodeSize; i++)
    {
        if((code >> i) & 1)
        {
            this.decode.push(true);
        }
        else
        {
            this.decode.push(false);
        }
    }

    this.dataset = [];
    for(var i = 0; i < maxRowSize; i++)
    {
        var data =[];
        for(var j = 0; j < colSize; j++)
        {
            data.push(false);
        }
        this.dataset.push(data);
    }

    for(var i = 0; i < colSize; i++ )
    {
        this.dataset[0][i] = pattern[i];
    }

    this.isSetup = true;
}

//------------------------------------------
eca.prototype.draw = function(x, y, width, height)
{
    var unitWidth = width / this.colSize;
    var unitHeight = height / this.maxRowSize;
    for(var j = 0; j < this.maxRowSize; j++ )
    {
        var y = j * unitHeight;
        for(var i = 0; i < this.colSize; i++)
        {
            var x = i * unitWidth;
            this.drawUnit(x, y, this.dataset[j][i], unitWidth, unitHeight);
        }
    }
}

//------------------------------------------
eca.prototype.nextGeneration = function()
{
    var next = [];
    for(var i = 0; i < this.maxRowSize; i++)
    {
        var data = [0, 0, 0];
        if(i == 0)
        {
            data[0] = this.dataset[0][this.maxRowSize - 1];
        }
        else
        {
            data[0] = this.dataset[0][i - 1];
        }

        if(i == (this.maxRowSize - 1))
        {
            data[2] = this.dataset[0][0];
        }
        else
        {
            data[2] = this.dataset[0][i + 1];
        }
        data[1] = this.dataset[0][i];

        var code = 0;
        for(var j = 0; j < data.length; j++)
        {
            if(data[j])
            {
                code += (1 << j);
            }
        }
        next.push(this.decode[code]);
    }
    this.dataset.pop();
    this.dataset.unshift(next);

}

//------------------------------------------
eca.prototype.drawUnit = function(x, y, state, width, height)
{
    if(state)
    {
        fill(color(255, 0, 0));
    }
    else
    {
        fill(color(0));
    }
    noStroke();
    rect(x, y, width, height);

}
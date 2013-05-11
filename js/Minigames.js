function Minigames()
{
	this.player = new m_Player(ctx);
	this.pickup = new m_Pickup(ctx);	
	
	this.enemy = [];
	this.MAXENEMIES = 5;
	
	this.InitPW = function()
	{
		this.MAXENEMIES = 5;
		this.player.lives = 3;
		this.player.Init();
		
		this.enemy.push(new m_Enemy());	this.enemy[0].Init(20, 60, 19, 0, 0);
		this.enemy.push(new m_Enemy());	this.enemy[1].Init(620, 120, -18, 0, 1);
		this.enemy.push(new m_Enemy());	this.enemy[2].Init(20, 180, -17, 0, 2);
		this.enemy.push(new m_Enemy());	this.enemy[3].Init(620, 320, 16, 0, 3);
		this.enemy.push(new m_Enemy());	this.enemy[4].Init(20, 360, -14, 0, 4);
		
		this.pickup.Init();
	}
	
	this.InitPM = function()
	{
		this.MAXENEMIES = 5;
		this.player.lives = 3;
		this.player.Init();
		
		for (var i = 0; i < this.MAXENEMIES; i++)
		{
			this.enemy.push(new m_Enemy());
			this.enemy[i].Init(Math.floor((Math.random()*310)+1),
							   Math.floor((Math.random()*230)+1),
							   Math.floor((Math.random()*10)+1),
							   Math.floor((Math.random()*10)+1),
							   0);
		}
		this.pickup.Init();
	}
	
	this.PoopWay = function()
	{
		this.player.Draw();
		this.player.HandleInput();
		for (var i = 0; i < this.MAXENEMIES; i++)
		{
			this.enemy[i].Draw();
			this.enemy[i].Handle(1);
			
			if(CheckCollision(this.player.x, this.player.y, this.enemy[i].x, this.enemy[i].y, 28))
			{
				this.player.Respawn();
				this.player.lives--;
			}
		}
		this.pickup.Draw();		
		
		if(CheckCollision(this.player.x, this.player.y, this.pickup.x, this.pickup.y, 28))
		{
			pet.coins += 10;
			this.player.Respawn();
			this.pickup.Init();
		}
	}
	
	this.PoopMania = function()
	{
		if(CheckCollision(this.player.x, this.player.y, this.pickup.x, this.pickup.y, 28))
		{
			this.player.score++;
			this.MAXENEMIES++;
			this.enemy[this.MAXENEMIES].Init(Math.floor((Math.random()*310)+1),
										     Math.floor((Math.random()*230)+1),
										     Math.floor((Math.random()*10)+1),
										     Math.floor((Math.random()*10)+1),
										     0);
			this.pickup.Init();
			pet.coins += 10;
		}
		
		this.player.Draw();
		this.player.HandleInput();
		for (var i = 0; i < this.MAXENEMIES; i++)
		{
			this.enemy[i].Draw();
			this.enemy[i].Handle(0);
			
			if(CheckCollision(this.player.x, this.player.y, this.enemy[i].x, this.enemy[i].y, 28))
			{
				this.player.lives--;
				this.enemy[i].dx = -this.enemy[i].dx;
				this.enemy[i].dy = -this.enemy[i].dy;
			}
		}
		this.pickup.Draw();
	}
}
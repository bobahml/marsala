﻿using Common.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;

namespace WebApplication1.Hubs
{
    [Authorize]
    [HubName("messages")]
	public class MessagesHub : Hub
	{
		public void NewOrder(Order chatMessage)
		{
			Clients.All.SendMessage(chatMessage);
		}
	}
}

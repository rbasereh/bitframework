﻿using System.Diagnostics;

namespace TodoTemplate.App.Services.Implementations;

public class TodoTemplateExceptionHandler : IExceptionHandler
{
    public void OnExceptionReceived(Exception exception, IDictionary<string, object?>? parameters = null)
    {
#if DEBUG
        Debugger.Break();

        Console.WriteLine(exception.ToString());
#endif
    }
}

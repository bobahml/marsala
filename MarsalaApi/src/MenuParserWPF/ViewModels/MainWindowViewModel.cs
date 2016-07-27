using System;
using System.Collections.ObjectModel;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows;
using Catel.Data;
using Catel.Services;
using MenuParser.Models;
using Catel.MVVM;
using IWshRuntimeLibrary;
using DailyMenu = MenuParser.Models.DailyMenu;
using Common.Services;
using System.Linq;

namespace MenuParser.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        private readonly IOpenFileService _openFileService;
        private readonly IMessageService _messageService;
        private readonly IDispatcherService _dispatcherService;
        private readonly IStartUpInfoProvider _startUpInfoProvider;
        private readonly IFileParser _menuParser;

        public MainWindowViewModel(IOpenFileService openFileService,
            IMessageService messageService,
            IDispatcherService dispatcherService,
            IStartUpInfoProvider startUpInfoProvider,
            IFileParser menuParser
            )
        {
            _openFileService = openFileService;
            _messageService = messageService;
            _dispatcherService = dispatcherService;
            _startUpInfoProvider = startUpInfoProvider;
            _menuParser = menuParser;
        }

        public override string Title => "MenuParser. Ver. " + Assembly.GetExecutingAssembly().GetName().Version;

        #region Menus property

        /// <summary>
        /// Gets or sets the Menus value.
        /// </summary>
        public ObservableCollection<DailyMenu> Menus
        {
            get { return GetValue<ObservableCollection<DailyMenu>>(MenusProperty); }
            set { SetValue(MenusProperty, value); }
        }

        /// <summary>
        /// Menus property data.
        /// </summary>
        public static readonly PropertyData MenusProperty = RegisterProperty("Menus", typeof(ObservableCollection<DailyMenu>), new ObservableCollection<DailyMenu>());

        #endregion

        #region OrderText property

        /// <summary>
        /// Gets or sets the OrderText value.
        /// </summary>
        public string OrderText
        {
            get { return GetValue<string>(OrderTextProperty); }
            set { SetValue(OrderTextProperty, value); }
        }

        /// <summary>
        /// OrderText property data.
        /// </summary>
        public static readonly PropertyData OrderTextProperty = RegisterProperty("OrderText", typeof(string));

        #endregion

        #region CurrentFileName property

        /// <summary>
        /// Gets or sets the CurrentFileName value.
        /// </summary>
        public string CurrentFileName
        {
            get { return GetValue<string>(CurrentFileNameProperty); }
            set { SetValue(CurrentFileNameProperty, value); }
        }

        /// <summary>
        /// CurrentFileName property data.
        /// </summary>
        public static readonly PropertyData CurrentFileNameProperty = RegisterProperty("CurrentFileName", typeof(string), "Choose actual menu file received from an administrator...");

        #endregion

        #region OpenFile command

        private TaskCommand _openFileCommand;

        /// <summary>
        /// Gets the OpenFile command.
        /// </summary>
        public TaskCommand OpenFileCommand
        {
            get { return _openFileCommand ?? (_openFileCommand = new TaskCommand(OpenFile, () => !OpenFileCommand.IsExecuting)); }
        }

        /// <summary>
        /// Method to invoke when the OpenFile command is executed.
        /// </summary>
        private Task OpenFile()
        {
            _openFileService.Filter = "All files|*.docx;*.xlsx|DocX files|*.docx|XlsX files|*.xlsx";
            if (!_openFileService.DetermineFile())
                return Task.FromResult(0);

            return Task.Run(() => ProcessFile(_openFileService.FileName));
        }



        #endregion

        #region AppendOrder command

        private TaskCommand<MenuSet> _appendOrderCommand;

        /// <summary>
        /// Gets the AppendOrder command.
        /// </summary>
        public TaskCommand<MenuSet> AppendOrderCommand
        {
            get { return _appendOrderCommand ?? (_appendOrderCommand = new TaskCommand<MenuSet>(AppendOrder)); }
        }

        /// <summary>
        /// Method to invoke when the AppendOrder command is executed.
        /// </summary>
        private async Task AppendOrder(MenuSet menuSet)
        {
            if (string.IsNullOrEmpty(menuSet.Salad) || string.IsNullOrEmpty(menuSet.Soup) ||
                string.IsNullOrEmpty(menuSet.MainCourse) || string.IsNullOrEmpty(menuSet.Drink))
            {
                if (await _messageService.ShowAsync("Order contains empty fiels", "Warn!", MessageButton.OKCancel) != MessageResult.OK)
                    return;
            }

            var str = menuSet.ToString();
            OrderText += str + Environment.NewLine;

            try { Clipboard.SetText(str); }
            catch
            {// ignored
            }
        }


        #endregion

        #region CreateShortcut command

        private Command _createShortcutCommand;

        /// <summary>
        /// Gets the CreateShortcut command.
        /// </summary>
        public Command CreateShortcutCommand
        {
            get { return _createShortcutCommand ?? (_createShortcutCommand = new Command(CreateShortcut)); }
        }

        /// <summary>
        /// Method to invoke when the CreateShortcut command is executed.
        /// </summary>
        private void CreateShortcut()
        {
            try
            {
                object shDesktop = "Desktop";
                WshShell shell = new WshShell();
                string shortcutAddress = (string)shell.SpecialFolders.Item(ref shDesktop) + @"\MenuParser.lnk";
                IWshShortcut shortcut = (IWshShortcut)shell.CreateShortcut(shortcutAddress);
                shortcut.Description = "Shortcut for a MenuParser";
                string shortcutTarget = System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName;
                shortcut.TargetPath = shortcutTarget;
                shortcut.Save();
                _messageService.ShowAsync("Created!");
            }
            catch (Exception ex)
            {
                _messageService.ShowErrorAsync(ex);
            }
        }

        #endregion

        private void ProcessFile(string file)
        {
            _dispatcherService.BeginInvoke(() =>
            {
                OrderText = string.Empty;
                CurrentFileName = file;
            });

            var menuList = _menuParser.ProcessLocalFile(file);

            _dispatcherService.BeginInvoke(() =>
            {
                var coll = menuList.Select(menu => new DailyMenu(menu));
                Menus = new ObservableCollection<DailyMenu>(coll);
            });
        }

        protected override Task InitializeAsync()
        {
            return _startUpInfoProvider.Arguments.Length > 0
                ? Task.Run(() => ProcessFile(_startUpInfoProvider.Arguments[0]))
                : base.InitializeAsync();
        }
    }
}

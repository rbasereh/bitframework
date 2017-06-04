﻿using System.Linq;
using System.Threading;
using Bit.Test;
using Bit.Test.Core.Implementations;
using Bit.Test.Server;
using Bit.Tests.Api.ApiControllers;
using Bit.Tests.Model.DomainModels;
using FakeItEasy;
using IdentityModel.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using System.Web.OData.Query;
using Bit.Tests.Model.Dto;

namespace Bit.Tests.HtmlClient.ViewModel.Implementation
{
    [TestClass]
    public class LookupsTests
    {
        [TestMethod]
        [TestCategory("HtmlClient")]
        public virtual void TestODataLookupBaseFilter()
        {
            using (BitOwinTestEnvironment testEnvironment = new BitOwinTestEnvironment(new TestEnvironmentArgs { UseRealServer = true }))
            {
                TokenResponse token = testEnvironment.Server.Login("ValidUserName", "ValidPassword", clientName: "TestResOwner");

                using (RemoteWebDriver driver = testEnvironment.Server.GetWebDriver(new RemoteWebDriverOptions { Token = token }))
                {
                    driver.NavigateToRoute("lookups-page");
                    driver.WaitForControlReady();
                }

                CountriesController countriesController = TestDependencyManager.CurrentTestDependencyManager.Objects
                    .OfType<CountriesController>()
                    .Last();

                A.CallTo(() => countriesController.GetAllContries(A<ODataQueryOptions<CountryDto>>.That.Matches(query => query.Filter.RawValue == "((SomeProperty eq 1) or (SomeProperty eq 3))")))
                    .MustHaveHappened(Repeated.Exactly.Once);
            }
        }
    }
}
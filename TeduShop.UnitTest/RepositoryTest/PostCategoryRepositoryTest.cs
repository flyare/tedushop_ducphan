using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduShop.Data.Infrastructure;
using TeduShop.Data.Repositories;
using TeduShop.Model.Models;

namespace TeduShop.UnitTest.RepositoryTest
{
    [TestClass]
    public class PostCategoryRepositoryTest
    {
        private IDbFactory _dbFactory;
        private IPostCategoryRepository _objRepository;
        private IUnitOfWork _unitOfWork; 

        [TestInitialize]
        public void Initialize()
        {
            _dbFactory = new DbFactory();
            _objRepository = new PostCategoryRepository(_dbFactory);
            _unitOfWork = new UnitOfWork(_dbFactory);
        }

        [TestMethod]
        public void PostCategory_Repository_GetAll()
        {
            var list = _objRepository.GetAll().ToList();

            Assert.AreNotEqual(0, list);
        }

        [TestMethod]
        public void PostCategory_Repository_Create()
        {
            var postCategory = new PostCategory();
            postCategory.Name = "Test category";
            postCategory.Alias = "Test-category";

            var result = _objRepository.Add(postCategory);

            _unitOfWork.Commit();

            Assert.IsNotNull(result);
            Assert.AreNotEqual(0, result.ID);
        }
    }
}

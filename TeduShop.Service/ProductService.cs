using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduShop.Data.Infrastructure;
using TeduShop.Data.Repositories;
using TeduShop.Model.Models;

namespace TeduShop.Service
{
    public interface IProductService
    {
        Product Add(Product entity);

        void Update(Product entity);

        Product Delete(int id);

        IEnumerable<Product> GetAll();

        IEnumerable<Product> GetAll(string keyword);

        Product GetById(int id);

        void Save();
    }

    public class ProductService: IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductCategoryService _productCategoryService;
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IProductRepository productRepository, IUnitOfWork unitOfWork, IProductCategoryService productCategoryService)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _productCategoryService = productCategoryService;
        }

        public Product Add(Product entity)
        {
            return _productRepository.Add(entity);
        }

        public void Update(Product entity)
        {
            _productRepository.Update(entity);
        }

        public Product Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> GetAll()
        {
            IEnumerable<Product> lst = new List<Product>();
            lst = _productRepository.GetAll();
            foreach (var product in lst)
            {
                product.ProductCategory = _productCategoryService.GetById(product.CategoryID);
            }
            return lst;
        }

        public IEnumerable<Product> GetAll(string keyword)
        {
            IEnumerable<Product> lst = null;

            if (!string.IsNullOrEmpty(keyword))
            {
                lst = _productRepository.GetMulti(x => x.Name.Contains(keyword) || x.Description.Contains(keyword));
                foreach (var product in lst)
                {
                    product.ProductCategory = _productCategoryService.GetById(product.CategoryID);
                }
            }
            else
            {
                lst = GetAll();
            }

            return lst;
        }

        public Product GetById(int id)
        {
            return _productRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}

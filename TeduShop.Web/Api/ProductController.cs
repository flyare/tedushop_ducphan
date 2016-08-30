using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using TeduShop.Model.Models;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;
using TeduShop.Web.Infrastructure.Extensions;
using TeduShop.Web.Models;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiControllerBase
    {
        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request, string keyword, int page, int pageSize = 20)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productService.GetAll(keyword);
                var total = model.Count();
                var query = model.OrderByDescending(x => x.CreatedDate).Skip(page*pageSize).Take(pageSize);

                var responseData = Mapper.Map<IEnumerable<Product>, IEnumerable<ProductViewModel>>(query);
                var paginationSet = new PaginationSet<ProductViewModel>
                {
                    Items = responseData,
                    Page = page,
                    TotalCount = total,
                    TotalPages = (int) Math.Ceiling((decimal) total/pageSize)
                };
                return request.CreateResponse(HttpStatusCode.OK, paginationSet);
            });
        }

        [Route("getbyid/{id:int}")]
        [HttpGet]
        public HttpResponseMessage GetById(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productService.GetById(id);
                var responseData = Mapper.Map<Product, ProductViewModel>(model);

                return request.CreateResponse(HttpStatusCode.OK, responseData);
            });
        }

        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, ProductViewModel productVm)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                HttpResponseMessage response = null;
                var product = new Product();
                product.UpdateProduct(productVm);
                product.CreatedDate = DateTime.Now;
                _productService.Add(product);
                _productService.Save();
                var responseData = Mapper.Map<Product, ProductViewModel>(product);
                response = request.CreateResponse(HttpStatusCode.Created, responseData);

                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, ProductViewModel productVm)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                HttpResponseMessage response = null;
                var dbProduct = _productService.GetById(productVm.ID);
                dbProduct.UpdatedDate = DateTime.Now;
                dbProduct.UpdateProduct(productVm);

                _productService.Update(dbProduct);
                _productService.Save();
                var responseData = Mapper.Map<Product, ProductViewModel>(dbProduct);
                response = request.CreateResponse(HttpStatusCode.Created, responseData);

                return response;
            });
        }

        [Route("delete")]
        [HttpDelete]
        public HttpResponseMessage Delete(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var oldProduct = _productService.Delete(id);
                _productService.Save();
                var responseData = Mapper.Map<Product, ProductViewModel>(oldProduct);
                response = request.CreateResponse(HttpStatusCode.Created, responseData);

                return response;
            });
        }

        [Route("deletemulti")]
        [HttpDelete]
        public HttpResponseMessage DeleteMulti(HttpRequestMessage request, string checkedProducts)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var lstId = checkedProducts.Split(',').ToList();

                foreach (var id in lstId)
                {
                    _productService.Delete(Convert.ToInt32(id));
                }

                _productService.Save();

                /*var oldProductCategory = _productCategoryService.Delete(id);
                _productCategoryService.Save();*/
                response = request.CreateResponse(HttpStatusCode.Created, lstId.Count);

                return response;
            });
        }

        #region Initialize

        private readonly IProductService _productService;

        public ProductController(IErrorService errorService, IProductService productService) : base(errorService)
        {
            _productService = productService;
        }

        #endregion
    }
}
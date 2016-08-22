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
    [RoutePrefix("api/productcategory")]
    public class ProductCategoryController : ApiControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public ProductCategoryController(IErrorService errorService, IProductCategoryService productCategoryService)
            : base(errorService)
        {
            _productCategoryService = productCategoryService;
        }

        [Route("getall")]
        public HttpResponseMessage GetAll(HttpRequestMessage request, string keyword, int page, int pageSize = 20)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productCategoryService.GetAll(keyword);
                var total = model.Count();
                var query = model.OrderByDescending(x => x.CreatedDate).Skip(page*pageSize).Take(pageSize);
                var responseData = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(query);
                var paginationSet = new PaginationSet<ProductCategoryViewModel>
                {
                    Items = responseData,
                    Page = page,
                    TotalCount = total,
                    TotalPages = (int) Math.Ceiling((decimal) total/pageSize)
                };
                return request.CreateResponse(HttpStatusCode.OK, paginationSet);
            });
        }

        public HttpResponseMessage Create(HttpRequestMessage request, ProductCategoryViewModel productCategoryVM)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                HttpResponseMessage response = null;
                var newProductCategory = new ProductCategory();
                newProductCategory.UpdateProductCategory(productCategoryVM);

                _productCategoryService.Add(newProductCategory);
                var responseData = Mapper.Map<ProductCategory, ProductCategoryViewModel>(newProductCategory);
                response = request.CreateResponse(HttpStatusCode.Created, responseData);

                return response;
            });
        }
    }
}
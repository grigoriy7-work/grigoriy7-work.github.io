import React, { memo, useEffect } from 'react';
import { Input, InputNumber, Space, Select, Button, message } from 'antd';
// eslint-disable-next-line import/named
import { DollarOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Product, Category } from '../../graphql/types';
import { skipToken, useQuery } from '@apollo/client/react';
import { GET_CATEGORIES_QUERY, GetManyCategoriesResponse } from './queryCategory';
import { useMutation } from '@apollo/client/react';
import { MUTATION_ADD_PRODUCT, MutationAddProductResponse, ProductAddInput } from './mutationProduct';
import { ServerErrors } from '../../graphql/types';

export const ProductForm = memo(() => {
  //const { t } = useTranslation();
  const prefix = <DollarOutlined />;
  const token = useSelector((state: RootState) => state.auth.token);
  const {
    loading: loadingGetCategories,
    error: errorGetCategories,
    data: dataGetCategories,
  } = useQuery<GetManyCategoriesResponse>(GET_CATEGORIES_QUERY, token ? { variables: { token } } : skipToken);

  const [addProductMutation, { loading: loadingAddProduct, error: errorAddProduct }] = useMutation<
    MutationAddProductResponse,
    { input: ProductAddInput }
  >(MUTATION_ADD_PRODUCT);

  const [messageApi, contextHolder] = message.useMessage();

  const categories = dataGetCategories?.categories?.getMany?.data || [];

  const validate = (values: Product) => {
    const errors: Partial<Product> = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.price || values.price <= 0) {
      errors.price = 0;
    }

    return errors;
  };

  const formik = useFormik<Product>({
    initialValues: {
      id: crypto.randomUUID(),
      name: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 0,
      category: undefined,
    },
    validate,
    onSubmit: async (values) => {
      console.log('values', values);

      const productInput: ProductAddInput = {
        name: values.name!,
        price: values.price!,
        categoryId: values.category!.id,
      };

      try {
        const response = await addProductMutation({ variables: { input: productInput } });
        const createdProduct = response.data;
        messageApi.open({
          type: 'success',
          content: `Продукт создан`,
        });
      } catch (error) {
        console.error('Product error:', error);
        messageApi.open({
          type: 'error',
          content: `Ошибка: ${error?.errors[0]?.message || 'Unknown error'}`,
        });
      }
    },
  });

  useEffect(() => {
    if (categories.length > 0) {
      if (formik.values.category === undefined) {
        formik.setFieldValue('category', { id: categories[0].id, name: categories[0].name });
      }
    }
  }, [categories, formik.setFieldValue, formik.values.category]);

  return (
    <div>
      {contextHolder}
      <h2>Продукт</h2>
      <form onSubmit={formik.handleSubmit}>
        <Space direction="vertical" size="small">
          <Select
            allowClear={true}
            value={formik.values.category?.id || undefined}
            placeholder="Select Category"
            onChange={(value: string) => formik.setFieldValue('category', value)}
            onBlur={formik.handleBlur}
            options={
              categories.map((category) => ({
                label: category.name,
                value: category.id,
              })) || []
            }
            style={{ width: 200 }}
          />
          <Input
            name="name"
            placeholder="Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <InputNumber
            prefix={prefix}
            value={formik.values.price}
            onChange={(value) => formik.setFieldValue('price', value)}
            onBlur={formik.handleBlur}
            min={0}
            max={1000000}
            step={1}
            style={{ width: 200 }}
          />
          <Button htmlType="submit">Сохранить</Button>
        </Space>
      </form>
    </div>
  );
});
